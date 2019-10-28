package finalProject.controllers;

import finalProject.entities.Address;
import finalProject.entities.Insurance;
import finalProject.entities.Patient;
import finalProject.entities.Sex;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.google.gson.Gson;
import org.junit.*;
import org.junit.runners.MethodSorters;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.context.support.GenericWebApplicationContext;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContext;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

/**
 * This class uses the dataloader as test data for the get methods
 */
@RunWith(SpringRunner.class)
@SpringBootTest()
@AutoConfigureMockMvc
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class patientControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private WebApplicationContext wac;
    private static Patient newPatient;
    private static Patient testPatient;
    private static List<Patient> patients = new ArrayList<>();

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
        MockitoAnnotations.initMocks(this);
        Address testAddress = new Address("123 test street",
                "test city",
                "CO",
                "12345");
        Insurance testInsurance = new Insurance("Medicaid");
        Sex testSex = new Sex("Male");
        testPatient = new Patient("Walter",
                "Hoang",
                "123-45-6789",
                testAddress,
                22,
                59,
                195,
                testInsurance,
                testSex);
        testPatient.setId(Integer.toUnsignedLong(2)); // accounts for dataloader to avoid confusion
        newPatient = new Patient("James", "Bond", "111-11-1111", testAddress, 54, 64, 205, testInsurance, testSex);
        newPatient.setId(Integer.toUnsignedLong(3)); // accounts for dataloader to avoid confusion
        patients.add(testPatient);
    }

    /**
     * Verify test config
     */
    @Test
    public void checkContext() {
        ServletContext servletContext = wac.getServletContext();
        Assert.assertNotNull(servletContext);
        Assert.assertTrue(servletContext instanceof MockServletContext);
        Assert.assertTrue(((GenericWebApplicationContext) wac).isActive());
    }

    @Test
    public void AtestGetAllPatients() throws Exception {
        mockMvc.perform(get("/patients"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }
    @Test
    public void BtestGetPatientById() throws Exception{
        mockMvc.perform(get("/patients/1"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk());
    }
    @Test
    public void CtestCreatePatient() throws Exception{
        Gson gson = new Gson();
        String json = gson.toJson(newPatient);
        mockMvc.perform(post("/patients").contentType(APPLICATION_JSON_UTF8)
        .content(json))
                .andExpect(status().isCreated());
        // verify it gets in the DB
        mockMvc.perform(get("/patients"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
        // remove patient for future tests if running all of them at once
        mockMvc.perform(delete("/patients/2"));
    }
    @Test
    public void DtestUpdatePatient() throws Exception{
        Gson gson = new Gson();
        String json = gson.toJson(newPatient);

        mockMvc.perform(put("/patients/1").contentType(APPLICATION_JSON_UTF8)
        .content(json))
                .andExpect(status().isOk());
        mockMvc.perform(get("/patients/1"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value(newPatient.getFirstName()));
    }
    @Test
    public void EtestDeletePatient() throws Exception{
        Gson gson = new Gson();
        newPatient.setSsn("222-22-2233"); // to get around a 409 when running all tests
        String json = gson.toJson(newPatient);
        mockMvc.perform(post("/patients").contentType(APPLICATION_JSON_UTF8)
                .content(json))
                .andExpect(status().isCreated());
        // verify it gets in the DB
        mockMvc.perform(get("/patients"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
        mockMvc.perform(delete("/patients/3")); // it is 3 when running all tests
        //confirm patient is deleted
        mockMvc.perform(get("/patients"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }
}
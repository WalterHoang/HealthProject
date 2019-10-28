package finalProject.controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import finalProject.entities.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.GenericWebApplicationContext;

import javax.servlet.ServletContext;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest()
@AutoConfigureMockMvc
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class EncounterControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private WebApplicationContext wac;
    private Address testAddress = new Address("123 test street",
            "test city",
            "CO",
            "12345");
    private Insurance testInsurance = new Insurance("Medicaid");
    private Sex testSex = new Sex("Male");
    private Date testDate = new Date();
    private Encounter testEncounter;
    @Before
    public void setup(){
        Patient testPatient = new Patient("Walter",
                "Hoang",
                "123-45-6789",
                testAddress,
                22,
                59,
                195,
                testInsurance,
                testSex);
        testPatient.setId((long)1);
        testEncounter = new Encounter(testPatient,
                "",
                "H7J 8W2",
                "Blue Shield",
                "123.456.789-12",
                "A22",
                (float)205.50,
                (float)5.50,
                "Fractured Arm",
                null,
                null,
                null,
                testDate);
    }
    @Test
    public void checkContext() {
        ServletContext servletContext = wac.getServletContext();
        Assert.assertNotNull(servletContext);
        Assert.assertTrue(servletContext instanceof MockServletContext);
        Assert.assertTrue(((GenericWebApplicationContext) wac).isActive());
    }
    @Test
    public void AtestGetAllEncounters() throws Exception{
        mockMvc.perform(get("/encounters"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));
    }
    @Test
    public void BtestGetEncounterById() throws Exception{
        mockMvc.perform(get("/encounters/1"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk());
    }
    @Test
    public void CtestGetEncountersByPatientId() throws Exception{
        mockMvc.perform(get("/encounters/patient/1"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));
    }
    @Test
    public void DtestCreateEncounter() throws Exception{
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
        String json = gson.toJson(testEncounter);
        mockMvc.perform(post("/encounters").contentType(APPLICATION_JSON_UTF8)
                .content(json))
                .andExpect(status().isCreated());
        // verify it gets in the DB
        mockMvc.perform(get("/encounters"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(4)));
        // remove encounter for future tests if running all of them at once
        mockMvc.perform(delete("/encounters/4"));
    }
    @Test
    public void EtestUpdateEncounter() throws Exception{
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
        testEncounter.setChiefComplaint("Headaches");
        String json = gson.toJson(testEncounter);
        mockMvc.perform(put("/encounters/1").contentType(APPLICATION_JSON_UTF8)
                .content(json))
                .andExpect(status().isOk());
        mockMvc.perform(get("/encounters/1"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.chiefComplaint").value(testEncounter.getChiefComplaint()));
    }
    @Test
    public void FtestDeleteEncounter() throws Exception{
        mockMvc.perform(delete("/encounters/3"));
        mockMvc.perform(get("/encounters"))
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }
}
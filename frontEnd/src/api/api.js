// Base API links below
const patientAPI = 'http://localhost:8080/patients';
const encounterAPI = 'http://localhost:8080/encounters';

/**
 * Gets all patients
 */
export const fetchPatients = () => {
    let APIparams = {
        method: 'GET',
        headers: new Headers({
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
        }),
    };
    return new Promise((resolve, reject) => {
        return fetch(patientAPI, APIparams)
            .then(res => {
                let jsonRes = res.json();
                if (res.status === 200) {
                    return jsonRes;
                } else {
                    throw res.status;
                }
            })
            .then(jsonRes => {
                resolve(jsonRes);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
/**
 * Adds a new patient object to the server
 * @param {Object} patient holds patient info 
 */
export const createPatient = (patient) => {
    let APIparams = {
        method: 'POST',
        headers: new Headers({
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(patient)
    };
    return new Promise((resolve, reject) => {
        return fetch(patientAPI, APIparams)
            .then(res => {
                let jsonRes = res.json();
                if (res.status === 201) {
                    return jsonRes;
                }
                else {
                    throw res.status;
                }
            })
            .then(jsonRes => {
                resolve(jsonRes);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
/**
 * Updates a selected patient's info in DB
 * @param {Object} patient new patient information 
 */
export const updatePatient = (id, patient) => {
    let APIparams = {
        method: 'PUT',
        headers: new Headers({
            'Accept': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(patient)
    };
    return new Promise((resolve, reject) => {
        return fetch(patientAPI + '/' + id, APIparams)
            .then(res => {
                let jsonRes = res.json();
                if (res.status === 200) {
                    return jsonRes;
                } else {
                    throw res.status;
                }
            })
            .then(jsonRes => {
                resolve(jsonRes);
            })
            .catch(err => {
                reject(err);
            });
    });
}
/**
 * Deletes a patient from the DB
 * @param {number} id patient id 
 */
export const deletePatient = (id) => {
    let APIparams = {
        method: 'DELETE',
        headers: new Headers({
            "Access-Control-Allow-Origin": "*"
        })
    };
    return new Promise((resolve, reject) => {
        return fetch(patientAPI + '/' + id, APIparams)
            .then(res => {
                if (res.status !== 204) {
                    throw res.status;
                };
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}
/**
 * Gets all encounters
 */
export const fetchAllEncounters = () => {
    let APIparams = {
        method: 'GET',
        headers: new Headers({
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
        }),
    };
    return new Promise((resolve, reject) => {
        return fetch(encounterAPI, APIparams)
            .then(res => {
                let jsonRes = res.json();
                if (res.status === 200) {
                    return jsonRes;
                } else {
                    throw res.status;
                }
            })
            .then(jsonRes => {
                resolve(jsonRes);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
/**
 * Gets all encounters associated with a patient
 * @param {number} id the id of the patient 
 */
export const fetchEncountersByPatient = (id) => {
    let APIparams = {
        method: 'GET',
        headers: new Headers({
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
        }),
    };
    return new Promise((resolve, reject) => {
        return fetch(encounterAPI + '/patient/' + id, APIparams)
            .then(res => {
                let jsonRes = res.json();
                if (res.status === 200) {
                    return jsonRes;
                } else {
                    throw res.status;
                }
            })
            .then(jsonRes => {
                resolve(jsonRes);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
/**
 * Posts a new encounter to the database
 * @param {Object} encounter object containing encounter info 
 */
export const createEncounter = (encounter) => {
    let APIparams = {
        method: 'POST',
        headers: new Headers({
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(encounter)
    };
    return new Promise((resolve, reject) => {
        return fetch(encounterAPI, APIparams)
            .then(res => {
                let jsonRes = res.json();
                if (res.status === 201) {
                    return jsonRes;
                } else {
                    throw res.status;
                }
            })
            .then(jsonRes => {
                resolve(jsonRes);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
/**
 * Updates an existing encounter in the database
 * @param {number} id id of old encounter 
 * @param {Object} encounter object containing new encounter info
 */
export const updateEncounter = (id, encounter) => {
    let APIparams = {
        method: 'PUT',
        headers: new Headers({
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(encounter)
    };
    return new Promise((resolve, reject) => {
        return fetch(encounterAPI + '/' + id, APIparams)
            .then(res => {
                let jsonRes = res.json();
                if (res.status === 200) {
                    return jsonRes;
                }
            })
            .then(jsonRes => {
                resolve(jsonRes);
            })
            .catch((err) => {
                reject(err);
            })
    })
}
/**
 * Deletes an existing encounter in the database
 * @param {number} id id of encounter to delete 
 */
export const deleteEncounter = (id) => {
    let APIparams = {
        method: 'DELETE',
        headers: new Headers({
            "Access-Control-Allow-Origin": "*"
        })
    };
    return new Promise((resolve, reject) => {
        return fetch(encounterAPI + '/' + id, APIparams)
            .then(res => {
                if (res.status !== 204) {
                    throw res;
                };
            })
            .then(res => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}
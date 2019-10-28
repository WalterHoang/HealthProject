import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllEncounters, deleteEncounter, encounterErrorReset } from '../../redux/actions/encounterActions';
import './css/encounter.css';
/**
 * This function gives the component access to the parts
 * of state it needs
 * @param {Object} state global state object 
 */
const mapStateToProps = (state) => {
    return {
        encounterState: state.encounters
    }
}
/**
 * This component handles the rendering of all components
 * as well as the ability to delete a encounter
 */
class AllEncounterTable extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.renderEncounter = this.renderEncounter.bind(this);
        this.convertToDate = this.convertToDate.bind(this);
        this.state = {}
    }
    componentDidMount() {// do this stuff when component loads
        this.props.dispatch(getAllEncounters());
        this.props.dispatch(encounterErrorReset());
    }
    /**
    * Dispatches action to remove encounter
    * @param {number} id encounter id
    */
    handleDelete(id) {
        this.props.dispatch(deleteEncounter(id));
    }
    /**
     * Converts the miliseconds to a readable date
     * format
     * @param {number} milisecs past Unix epoch
     */
    convertToDate(milisecs) {
        let date = new Date(milisecs);
        return date.toLocaleString();
    }
    /**
     * Renders a row of basic encounter info
     * @param {Object} encounter contains encounter info 
     * @param {*} key index of encounter in array
     */
    renderEncounter(encounter, key) {
        return (
            <tr key={'row - ' + key}>
                <td className='encounter-data'> 
                {/**Deal with the depreciated date type on the java layer */}
                    {this.convertToDate(encounter.date)}
                </td>
                <td className='encounter-data'>
                    {encounter.patient.firstName + ' ' + encounter.patient.lastName}
                </td>
                <td className='encounter-data'>
                    {encounter.chiefComplaint}
                </td>
                <td>
                    <button className='encounter-action' onClick={() => this.handleDelete(encounter.id)}>Delete Encounter</button>
                </td>
            </tr>
        )
    }
    render() {
        return (
            <div>
                <table className='encounter-table'>
                    <tbody>
                        <tr>
                            <th className='encounter-header'>
                                Encounter Date
                            </th>
                            <th className='encounter-header'>
                                Patient Name
                            </th>
                            <th className='encounter-header'>
                                Chief Complaint
                            </th>
                        </tr>
                        {this.props.encounterState.allEncounters.map(
                            (encounter, key) => this.renderEncounter(encounter, key)
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AllEncounterTable);
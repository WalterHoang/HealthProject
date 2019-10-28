import React, { Component } from 'react';
import NavBar from '../navigation/navBar/NavBar';
import AllEncounterTable from './AllEncounterTable';
import { connect } from 'react-redux';
import { encounterErrorReset } from '../../redux/actions/encounterActions';

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
 * This component serves as a container
 * for the general encounter table
 */
class EncounterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.props.dispatch(encounterErrorReset());
    }
    render() {
        return (
            <div className='center-div'>
                <NavBar />
                <h1>Encounter Directory</h1>
                <h2>To view additional details, please navigate to a patient's details</h2>
                <div id='all-encounter-errors'>
                    {this.props.encounterState.errors !== [] ? this.props.encounterState.errors.map((error, key) =>
                        <p className='errors' key={'error - ' + key}>{error}</p>
                    ) : null
                    }
                </div>
                <AllEncounterTable></AllEncounterTable>
            </div>);
    }
}

export default connect(mapStateToProps)(EncounterPage);
import store from "../../../redux/redux-store";
import {Preloader} from "../../Common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import React from "react";



export class ProfileStatus extends React.Component {

    state = {
        editMode: false
    }

    activateEditMode () {
        this.setState({
            editMode: true
        });
    }

    deactivateEditMode () {
        this.setState({
            editMode: false
        });
    }


    render() {
        return (
            <>
                {!this.state.editMode &&
                    <div>
                        <span  onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input autoFocus onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}/>
                    </div>
                }
            </>
        )
    }
}
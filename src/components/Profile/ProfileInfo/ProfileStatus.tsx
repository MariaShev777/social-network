import React, {ChangeEvent} from "react";


type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

type State = {
    editMode: boolean
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusType> {

    state = {
        editMode: false,
        status: this.props.status
    }


    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }


    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    }


    deactivateEditMode = () => {
        this.props.updateStatus(this.state.status);
        this.setState({
            editMode: false
        });

    }

    componentDidUpdate(prevProps: ProfileStatusType, prevState: State) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }


    render() {
        console.log('render')
        return (
            <>
                {!this.state.editMode &&
                    <div>
                        <span  onDoubleClick={this.activateEditMode}>{this.props.status || 'no status'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditMode} value={this.state.status}/>
                    </div>
                }
            </>
        )
    }
}
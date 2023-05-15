import React, {ChangeEvent} from "react";


import {sendMessageCreator, updateNewMessageTextCreator} from "../../redux/dialoguesReducer";
import Dialogues from "./Dialogues";
import {StoreType} from "../../redux/store";
import StoreContext from "../../StoreContext";

type DialoguesContainerPropsType = {
    // store: StoreType
}


const DialoguesContainer = (props: DialoguesContainerPropsType) => {



    return (
            <StoreContext.Consumer>
                { (store) => {
                    let state = store.getState().dialoguesPage;

                    let onSendMessageClick = () => {
                        store.dispatch(sendMessageCreator());
                    }

                    let onNewMessageChange = (text: string) => {
                        store.dispatch(updateNewMessageTextCreator(text))
                    }

                    return <Dialogues updateNewMessageText={onNewMessageChange}
                                      sendMessage={onSendMessageClick}
                                      dialoguesPage={state}/>
                }
            }
            </StoreContext.Consumer>
        )
}

export default DialoguesContainer;
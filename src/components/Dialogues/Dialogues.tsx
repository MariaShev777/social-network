import React from 'react';
import s from './Dialogues.module.css';

const Dialogues = () => {
    return (
        <div className={s.dialogues}>
            <div className={s.dialoguesItems}>
                <div className={s.dialogue + ' ' + s.active}>
                    Barsik
                </div>
                <div className={s.dialogue}>
                    Richi
                </div>
                <div className={s.dialogue}>
                    Musya
                </div>
                <div className={s.dialogue}>
                    Sharik
                </div>
                <div className={s.dialogue}>
                    Lessi
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Meeooww</div>
                <div className={s.message}>Wanna play?</div>
                <div className={s.message}>I would eat all day looooong</div>
            </div>
        </div>
    )
}

export default Dialogues;
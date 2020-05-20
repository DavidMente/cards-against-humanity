import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import MiniFormLayout from "../layout/MiniFormLayout";

type PlayerFormProps = {
  buttonText: string,
  action: (playerName: string) => void
}

const PlayerForm: FunctionComponent<PlayerFormProps> = ({buttonText, action}) => {

  const [playerName, setPlayerName] = useState('');
  const input: any = useRef(null);

  useEffect(() => {
    if (input && input.current) {
      input.current.focus()
    }
  }, []);

  function handleKey(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      action(playerName)
    }
  }

  function handleChange(value: string) {
    setPlayerName(value);
  }

  return <MiniFormLayout>
    <input type={'text'} onChange={(event) => handleChange(event.target.value)}
           value={playerName} className={'input'} onKeyDown={handleKey}
           placeholder={'Enter your name'} ref={input} />
    <button onClick={() => action(playerName)} className={'button is-primary'}
            disabled={playerName === ''}>{buttonText}
    </button>
  </MiniFormLayout>
};

export default PlayerForm;

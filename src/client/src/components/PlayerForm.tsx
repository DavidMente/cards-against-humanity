import React, {FunctionComponent, useEffect, useRef, useState} from "react";

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

  return <div className={'columns is-centered'}>
    <div className={'box button-box'}>
      <input type={'text'} onChange={(event) => setPlayerName(event.target.value)}
             value={playerName} className={'input'} onKeyDown={handleKey}
             placeholder={'Enter your name'} ref={input} />
      <button onClick={() => action(playerName)} className={'button is-primary'}
              disabled={playerName === ''}>{buttonText}
      </button>
    </div>
  </div>
};

export default PlayerForm;

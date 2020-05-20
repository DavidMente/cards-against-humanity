class MessageDto {

  public action: string;
  public payload?: any;

  constructor(action: string, payload?: any) {
    this.action = action;
    this.payload = payload;
  }
}

export default MessageDto;

import {logger} from "../logger";
import {NOT_FOUND} from "../exceptions/NotFoundException";
import WebSocket from "ws";
import MessageDto from "../dto/MessageDto";
import Exception from "../exceptions/Exception";

class ExceptionController {

  public static handle(ws: WebSocket, exception: Exception): void {
    logger.warn(exception.message);
    switch (exception.type) {
      case NOT_FOUND:
        return ExceptionController.notFound(ws);
      default:
    }
  }

  private static notFound = (ws: WebSocket): void => {
    const payload = new MessageDto(NOT_FOUND);
    ws.send(JSON.stringify(payload));
  };

}

export default ExceptionController

import React, {FunctionComponent} from "react";

type WhatsAppLinkProps = {
  text: string
}

const WhatsAppLink: FunctionComponent<WhatsAppLinkProps> = ({text}) =>
  <a href={`https://api.whatsapp.com/send?text=${text}`} data-action="share/whatsapp/share">
    <i className="fab fa-whatsapp-square" />
  </a>;

export default WhatsAppLink;

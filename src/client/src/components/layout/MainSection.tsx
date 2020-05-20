import React, {FunctionComponent} from "react";

const MainSection: FunctionComponent = ({children}) =>
  <section className={'section main-section'}>
    <div className={'container'}>
      {children}
    </div>
  </section>;

export default MainSection

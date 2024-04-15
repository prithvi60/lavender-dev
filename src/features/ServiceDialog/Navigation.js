import React, { createRef, useContext } from "react";
import Button from "../../components/Button";
import ScrollSpy from "react-ui-scrollspy"
import LayoutContext from "./LayoutContext";

export default function Navigation() {
    const [isColumn, setIsColumn] = useContext(LayoutContext);
    const toggleSuffix = isColumn ? 'Horizontal' : 'Vertical';
  
    function onClickToggleLayout(e) {
      e.preventDefault();
      setIsColumn(!isColumn);
    }
  
    return (
      <nav >
        <ScrollSpy>
          <Button
            href="#toggleLayout"
            text={`Toggle to ${toggleSuffix}`}
            onClick={onClickToggleLayout}
          />
          <Button href="#box-1" name="Box 1" ref={createRef()} />
          <Button href="#box-2" name="Box 2" ref={createRef()} />
          <Button href="#box-3" name="Box 3" ref={createRef()} />

        </ScrollSpy>
      </nav>
    );
  }
  
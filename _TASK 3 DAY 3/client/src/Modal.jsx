import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  // declare sebuah useRef dengan defaultValue null ke variable bernama elRef.
  const elRef = useRef(null);

  // validasi, apabila elRef current-nya kosong/tidak ada, maka dia akan diassign dengan sebuah element "div" melalui fungsi createElement
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.append(elRef.current);

    // 1. modalRoot => <div id="portal"></div>
    // 2. modalRoot.append elRef.current (return) =>
    // <div id="portal">
    //    <div (elRef)>
    //        <div>
    //          {children}
    //        </div>
    //    </div>
    // </div>

    // 3. Saat return-nya useEffect berjalan => <div id="portal"></div>

    return () => modalRoot.removeChild(elRef.current);
  }, []);

  // return createPortal
  //    <div (elRef)>
  //        <div>
  //          {children}
  //        </div>
  //    </div>
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;

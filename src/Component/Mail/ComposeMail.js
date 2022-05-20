import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import { useDispatch } from "react-redux";
import { emailActions, sendEmailToDB } from "../../store/email";

const ComposeMail = () => {
  const emailRef = useRef();
  const emailAddressRef = useRef();
  const dispatch = useDispatch();

  const sendEmailHandler = (e) => {
    e.preventDefault();
    const enteredEmailAddress = emailAddressRef.current.value;
    const enteredEmail = emailRef.current.value;
    
    dispatch(
      sendEmailToDB({
        emailAddress: enteredEmailAddress,
        email: enteredEmail,
        read: false
      })
    );
    dispatch(emailActions.unread())
    /* emailAddressRef.current.value=""
    emailRef.current.value="" */
  };
  console.log("compose");

  return (
    <>
      <section>
        <span>To</span>
        <input type="text" ref={emailAddressRef} />
      </section>
      <section>
        <JoditEditor ref={emailRef} />
      </section>
      <button onClick={sendEmailHandler}>SEND</button>
    </>
  );
};

export default ComposeMail;

/* import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import classes from ComposeMail.module.css";

const Home = () => {
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      />
    </>
  );
};

export default Home;
 */

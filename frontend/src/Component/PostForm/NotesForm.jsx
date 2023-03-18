/** @format */

import React from "react";
import {
  Button,
  Box,
  Spinner,
  Img,
  Textarea,
  Input,
  useToast,
} from "@chakra-ui/react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import FormModal from "../ModalComp/FormModal";
import SuccessGif from "../../Assests/Images/success.gif";
import InputComp from "../InputComp/InputComp";
import { AiOutlineCloudUpload, AiOutlineClose } from "react-icons/ai";
import { GlobalContext } from "../../Context/Context";

const tags = ["Educations", "Financial", "Medical", "Technology", "Others"];

const NotesForm = () => {
  const { setUpdateNote } = GlobalContext();
  const toast = useToast();
  const [openNoteForm, setOpenNoteForm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(true);
  const [isSuccess, setSuccess] = React.useState(false);
  // Title
  const [title, setTitle] = React.useState("");
  // Description
  const [description, setDescription] = React.useState("");
  // Image
  const [image, setImage] = React.useState("");
  const [prevImage, setPrevImage] = React.useState("");
  // Links
  const [link1, setLink1] = React.useState("");
  const [link1Err, setLink1Err] = React.useState(false);
  const [link2, setLink2] = React.useState("");
  const [link2Err, setLink2Err] = React.useState(false);
  const [link3, setLink3] = React.useState("");
  const [link3Err, setLink3Err] = React.useState(false);
  // Note catagory
  const [catagory, setCatagory] = React.useState("all");

  // *** Close modal
  const closeModal = () => {
    setOpenNoteForm(false);
  };

  // *** Handle link1
  const checkLink1 = (e) => {
    if (link1.length > 0) {
      var pattern =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (!link1.match(pattern)) {
        setLink1Err(true);
      } else {
        setLink1Err(false);
      }
    } else {
      setLink1Err(false);
    }
  };
  React.useEffect(() => {
    checkLink1();
  }, [link1]);

  // *** Handle link1
  const checkLink2 = (e) => {
    if (link2.length > 0) {
      var pattern =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (!link1.match(pattern)) {
        setLink2Err(true);
      } else {
        setLink2Err(false);
      }
    } else {
      setLink2Err(false);
    }
  };

  // *** Handle link1
  const checkLink3 = (e) => {
    if (link3.length > 0) {
      var pattern =
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      if (!link1.match(pattern)) {
        setLink3Err(true);
      } else {
        setLink3Err(false);
      }
    } else {
      setLink3Err(false);
    }
  };

  // *** Close catagory
  const closeCatagory = () => {
    setCatagory("");
  };

  // *** Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPrevImage(URL.createObjectURL(e.target.files[0]));
  };

  // *** Close preview image
  const closePreviewImage = () => {
    setImage("");
    setPrevImage("");
  };

  React.useEffect(() => {
    if (
      !title.trim() ||
      !description.trim() ||
      link1Err ||
      link2Err ||
      link3Err
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [title, description, link1Err, link2Err, link3Err]);

  // *** Handle create new note
  const createNote = () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));

    var formdata = new FormData();
    formdata.append("image", image);
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("catagory", catagory);
    formdata.append("link1", link1);
    formdata.append("link2", link2);
    formdata.append("link3", link3);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_LINK}note/create`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUpdateNote(result);
        closeModal();
        setIsDisable(true);
        setTitle("");
        setDescription("");
        setCatagory("all");
        setPrevImage("");
        setImage("");
        setLink1("");
        setLink2("");
        setLink3("");
        setSuccess(true);
        toast({
          title: "created.",
          description: `${result.msg}`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => console.log("error", error));
  };

  const closeSuccessModal = () => {
    setSuccess(false);
  };

  return (
    <React.Fragment>
      {isSuccess && (
        <FormModal
          isOpen={isSuccess}
          onClose={closeSuccessModal}
          body={
            <Box className='success_task_form_body_section'>
              <Img src={SuccessGif} className='success_gif' />
              <span className='success_text'>Your task has been saved</span>
            </Box>
          }
        />
      )}
      {openNoteForm && (
        <FormModal
          isOpen={openNoteForm}
          onClose={closeModal}
          title={
            <Box className='note_form_title'>
              <span className='not_modal_title'>Create note</span>
              {isDisable ? (
                <Button
                  className='note_modal_header_close_btn'
                  onClick={closeModal}>
                  Close
                </Button>
              ) : (
                <Button className='note_modal_header_btn' onClick={createNote}>
                  {isLoading ? <Spinner /> : <>Create</>}
                </Button>
              )}
            </Box>
          }
          body={
            <Box className='task_form_body_section'>
              {/* Title */}
              <InputComp
                type='text'
                placaeholder='Enter note title (require)'
                className='auth_input'
                value={title}
                handleChange={(e) => setTitle(e.target.value.slice(0, 50))}
              />

              {/* Description */}
              <Textarea
                type='text'
                placeholder='Enter task details (optional)'
                className='note_textarea'
                value={description}
                onChange={(e) => setDescription(e.target.value)}></Textarea>

              {/* Image */}
              <Box className='note_image_uploader'>
                <label htmlFor='note_file'>
                  <AiOutlineCloudUpload className='note_upload_icon' />
                </label>
                <Input
                  type='file'
                  id='note_file'
                  className='file_input'
                  onChange={(e) => handleImageChange(e)}
                />
              </Box>

              {/* Preview image */}
              {prevImage && (
                <Box className='preview_image_container'>
                  <Img src={prevImage} className='preview_image' />
                  <Button
                    className='close_prev_btn'
                    onClick={closePreviewImage}>
                    <AiOutlineClose />
                  </Button>
                </Box>
              )}

              {/* Links */}
              <span className='tag_title'>Links for future reference</span>
              <Input
                type='text'
                placeholder='Enter reference link'
                className={
                  link1Err ? "auth_input err_auth_input" : "auth_input"
                }
                value={link1}
                onChange={(e) => setLink1(e.target.value)}
                onBlur={checkLink1}
              />
              <Input
                type='text'
                placeholder='Enter reference link'
                className={
                  link2Err ? "auth_input err_auth_input" : "auth_input"
                }
                value={link2}
                onChange={(e) => setLink2(e.target.value)}
                onBlur={checkLink2}
              />
              <Input
                type='text'
                placeholder='Enter reference link'
                className={
                  link3Err ? "auth_input err_auth_input" : "auth_input"
                }
                value={link3}
                onChange={(e) => setLink3(e.target.value)}
                onBlur={checkLink3}
              />

              <Box className='tags_form'>
                <span className='tag_title'>What type of note is this?</span>
                <br />
                {tags.map((data, index) => (
                  <Button
                    key={index}
                    className={
                      catagory === data ? "tag_btn active_tag_btn" : "tag_btn"
                    }
                    onClick={() => setCatagory(data)}>
                    {data}
                  </Button>
                ))}
                <br />

                {catagory && catagory !== "all" && (
                  <span className='tag_title'>
                    You selected{" "}
                    <Button
                      className='tag_btn active_tag_btn'
                      onClick={() => closeCatagory()}>
                      {catagory}
                      <AiOutlineClose className='close_icon' />
                    </Button>
                  </span>
                )}
              </Box>
            </Box>
          }
        />
      )}
      <Button
        className='notes_form_button'
        onClick={() => setOpenNoteForm(true)}>
        <HiOutlinePencilAlt className='post_icon' />
      </Button>
    </React.Fragment>
  );
};

export default NotesForm;

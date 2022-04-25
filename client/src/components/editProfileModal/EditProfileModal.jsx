import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./editProfileModal.css";
import { uploadFile } from "../../actions/PostActions";
import { updateCurrentUser } from "../../actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";

const EditProfileModal = ({ showModal, setShowModal }) => {
    const user = useSelector((state) => state.user.currentUser);
    const [avatar, setAvatar] = React.useState(null);
    const [background, setBackground] = React.useState(null);
    const [description, setDescription] = React.useState(user?.description);
    const [city, setCity] = React.useState(user?.city);
    const [from, setFrom] = React.useState(user?.from);
    const [relationship, setRelationship] = React.useState(user?.relationship);
    const handleClose = () => {
        setShowModal(false);
        setDescription(user?.description);
        setCity(user?.city);
        setFrom(user?.from);
        setRelationship(user?.relationship);
        setAvatar(null);
        setBackground(null);
    };
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const profileUpdate = {
            description,
            city,
            from,
            relationship,
        };
        if (avatar) {
            const data = new FormData();
            const fileName = Date.now() + "_" + user._id + "_" + avatar.name;
            data.append("name", fileName);
            data.append("file", avatar);
            if (uploadFile(data)) {
                profileUpdate.profilePicture = fileName;
            }
        }
        if (background) {
            const data = new FormData();
            const fileName =
                Date.now() + "_" + user._id + "_" + background.name;
            data.append("name", fileName);
            data.append("file", background);
            if (uploadFile(data)) {
                profileUpdate.coverPicture = fileName;
            }
        }

        const updateProfile = async () => {
            dispatch(updateCurrentUser(profileUpdate));
        };
        updateProfile();
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit your profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <input
                        className="modalInput"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="inputFileGroup">
                        <label htmlFor="avatar">Avatar</label>
                        <input
                            id="avatar"
                            className="modalInputFile"
                            type="file"
                            placeholder="Avatar"
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => setAvatar(e.target.files[0])}
                        />
                        {avatar && (
                            <img
                                className="modalImg"
                                src={URL.createObjectURL(avatar)}
                                alt=""
                            />
                        )}
                    </div>
                    <div className="inputFileGroup">
                        <label htmlFor="background">Background</label>
                        <input
                            id="background"
                            className="modalInputFile"
                            type="file"
                            placeholder="Background"
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => setBackground(e.target.files[0])}
                        />
                        {background && (
                            <img
                                className="modalImg"
                                src={URL.createObjectURL(background)}
                                alt=""
                            />
                        )}
                    </div>

                    <input
                        className="modalInput"
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        className="modalInput"
                        type="text"
                        placeholder="From"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                    <div className="inputFileGroup">
                        <label htmlFor="relationship">Relationship</label>
                        <select
                            id="relationship"
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value)}
                        >
                            <option value="1">Single</option>
                            <option value="2">Married</option>
                            <option value="3" selected>
                                --- None ---
                            </option>
                        </select>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProfileModal;

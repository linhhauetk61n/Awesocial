import React from "react";
import "./topbar.css";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import * as api from "../../api";
import DropdownUser from "../dropdownUser/DropdownUser";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";

const Topbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const user = useSelector((state) => state.user.currentUser);
    const [dropdownUser, setDropdownUser] = React.useState(false);
    const handleClick = () => {
        setDropdownUser(!dropdownUser);
    };

    //SEARCH
    // Giữ nguyên giá trị mỗi lần re-render
    const typingTimeoutRef = React.useRef(null);
    const handleSearchQueryChange = (e) => {
        const value = e.target.value;

        //để set lại time out
        //SET --> 100 -> clear
        //SET ==> 300 ==> submit
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            if (value !== "") {
                handleSearch(value);
            } else {
                setUsersByEmail(null);
                setUsersByUsername(null);
            }
        }, 300);
    };
    const [usersByUsername, setUsersByUsername] = React.useState(null);
    const [usersByEmail, setUsersByEmail] = React.useState(null);
    const handleSearch = (query) => {
        const searchQuery = query.toLowerCase();
        const getUsers = async () => {
            const res = await api.searchByQuery(searchQuery);
            setUsersByUsername(res.data.usersByUsername);
            setUsersByEmail(res.data.usersByEmail);
        };
        getUsers();
    };
    return (
        <>
            <div className="topbar">
                <div className="topbarContainer">
                    <div className="topbarLeft">
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <span className="logo">Awesocial</span>
                        </Link>
                    </div>
                    <div className="topbarCenter">
                        <div className="searchbar">
                            <Search className="searchIcon" />
                            <input
                                type="text"
                                className="searchInput"
                                placeholder="Search for friend, post or video ..."
                                onChange={handleSearchQueryChange}
                            />
                            {(usersByUsername || usersByEmail) && (
                                <div className="searchResult">
                                    <span className="searchResultTitle">
                                        SEARCH RESULT:{" "}
                                    </span>
                                    <div className="searchResultBox">
                                        <div className="searchResultGroup">
                                            <span className="searchResultGroupTitle">
                                                Username
                                            </span>
                                            {usersByUsername?.map((u) => (
                                                <Link
                                                    to={`/profile/${u._id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                    key={u._id}
                                                >
                                                    <div className="searchResultItem">
                                                        <img
                                                            src={
                                                                u.profilePicture
                                                                    ? PF +
                                                                      u.profilePicture
                                                                    : "/assets/person/no-avatar.png"
                                                            }
                                                            alt=""
                                                            className="searchResultItemImg"
                                                        />
                                                        <span className="searchResultItemName">
                                                            {u.username}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="searchResultGroup">
                                            <span className="searchResultGroupTitle">
                                                Email
                                            </span>
                                            {usersByEmail?.map((u) => (
                                                <Link
                                                    to={`/profile/${u._id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                    key={u._id}
                                                >
                                                    <div className="searchResultItem">
                                                        <img
                                                            src={
                                                                u.profilePicture
                                                                    ? PF +
                                                                      u.profilePicture
                                                                    : "/assets/person/no-avatar.png"
                                                            }
                                                            alt=""
                                                            className="searchResultItemImg"
                                                        />
                                                        <span className="searchResultItemName">
                                                            {u.username}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="topbarRight">
                        <div className="topbarLinks">
                            <span className="topbarLink">Homepage</span>
                            <span className="topbarLink">TimeLine</span>
                        </div>
                        <div className="topbarIcons">
                            <div className="topbarIconItem">
                                <Person />
                                <span className="topbarIconBadge">1</span>
                            </div>
                            <Link
                                to="/messenger"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="topbarIconItem">
                                    <Chat />
                                    <span className="topbarIconBadge">0</span>
                                </div>
                            </Link>

                            <div className="topbarIconItem">
                                <Notifications />
                                <span className="topbarIconBadge">1</span>
                            </div>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{
                                    border: "none",
                                    backgroundColor: "transparent !important",
                                }}
                            >
                                <img
                                    src={
                                        user.profilePicture
                                            ? PF + user.profilePicture
                                            : "/assets/person/no-avatar.png"
                                    }
                                    alt=""
                                    className="topbarImg"
                                    onClick={handleClick}
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <DropdownUser user={user} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Topbar;

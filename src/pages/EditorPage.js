import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import ACTIONS from '../Actions';
import Client from '../components/Client';

import Chat from '../components/chat/Chat';
// import { initSocket } from '../socket';
import io from "socket.io-client";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from "../firebase";

import CodeEditor from "../components/editor/CodeEditor";

import {
    useLocation,
    useNavigate,
    Navigate,
    useParams,
} from 'react-router-dom';

const socket = io.connect("http://localhost:5000");

const EditorPage = () => {

    const [username, setUsername] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);

    useEffect(()=>{
        const listen = onAuthStateChanged(auth, (user)=>{
          if(user){
            setCurrentUser(user);
          }else{
            setCurrentUser(null);
            reactNavigator('/login');
          }
        });
        return ()=>{
          listen();
        };
      }, []);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await socket;
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            // Listening for joined event
            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, username, socketId }) => {
                    if (username !== location.state?.username) {
                        toast.success(`${username} joined the room.`);
                        console.log(`${username} joined`);
                    }
                    setClients(clients);
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
                   
                }
            );

            // Listening for disconnected
            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
           
        };
        init();
        return () => {
            if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);}
        };
    }, []);

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }
    if (!location.state) {
        return <Navigate to="/" />;
    }

    function leaveRoom() {
        reactNavigator('/');
    }

    return (
        <div className="mainWrap">
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <h1>CO-CODE</h1>
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {clients.map((client) => (
                            <Client
                                key={client.socketId}
                                username={client.username}
                            />
                        ))}
                    </div>
                </div>
                <button className="btn copyBtn" onClick={copyRoomId}>
                    Copy ROOM ID
                </button>
                <button className="btn leaveBtn" onClick={leaveRoom}>
                    Leave
                </button>
                
                
     
            </div>
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#0f0a19',
                color: '#718096', // equivalent to gray.500 in Chakra UI
                padding: '24px', // equivalent to px={6} and py={8} in Chakra UI
                }}>
                <CodeEditor 
                    socketRef={socketRef}
                    roomId={roomId}
                    onCodeChange={(code) => {
                    codeRef.current = code;
                    }}
                />
                </div>
            {/* <div className="editorWrap">
                <Editor
                    socketRef={socketRef}
                    roomId={roomId}
                    onCodeChange={(code) => {
                        codeRef.current = code;
                    }}
                />
            </div> */}
            <div className="chatWrap">
            <Chat socket={socket} username ={location.state?.username} room={roomId} />
    </div>
            
        </div>
       
    );
};

export default EditorPage;

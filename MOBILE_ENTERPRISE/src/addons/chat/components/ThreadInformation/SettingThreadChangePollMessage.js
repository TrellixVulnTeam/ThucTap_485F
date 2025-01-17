import React, { useEffect, useState } from 'react';
import {
    Text, View, Image, TouchableOpacity, SafeAreaView, Switch, ScrollView,
    InteractionManager
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
import isEqual from 'react-fast-compare';
// import DispatchImage from '../DispatchImage';
import ThreadStatusInChatBox from '../ThreadStatusInChatBox';
import { WIDTH } from '../../controllers/utils';
import styles from '../../static/style';
import DefaultAvatar from '../../static/default_ava.png';
import DefaultGroupAvatar from '../../static/default_group_avatar.png';
import * as Action from '../../controllers/actionTypes';

import AntIcon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StatusBar from '../../../base/components/StatusBar';
import DispatchImage from '../DispatchImage';
import Modal from 'react-native-modal';
const SettingThreadChangeSendMessage = () => {
    const dispatch = useDispatch();
    const [showPermission, setShowPermission] = useState(false);
    const [check1,setCheck1] = useState(false)
    const [check2,setCheck2] = useState(false)
    const [whoCanCreatePollMessage,setWhoCanCreatePollMessage] = useState("")
    const thread_id = useSelector(state => state.ChatUnstoredReducer.activeThreadId);
    let { who_can_create_poll_message } = useSelector(state => {
        const fullThreads = state.ChatStoredReducer.fullThreads || {};
        let Thread = fullThreads[thread_id];
        if (!Thread) return {}
        return { who_can_create_poll_message: Thread.who_can_create_poll_message }
    }, (prev, next) => isEqual(prev, next));
    
    

   
    const handleShowPermission = () => {
        setShowPermission(true)
    }

    const handleSubmitWhoCanEditThread = ()=>{
      
        dispatch({
            type:Action.API_UPDATE_THREAD_POLL_MESSAGE,
            data:{
                thread_id:thread_id,
                who_can_create_poll_message : whoCanCreatePollMessage
            },
            setShowPermission
        })
    }
    useEffect(() => {
        setWhoCanCreatePollMessage(who_can_create_poll_message)
        return () => {  
        }
    }, [])
    const permission = () => {
        try {
            return (
                <Modal isVisible={showPermission}
                    onBackButtonPress={() => {
                        // this.setState({
                        //     changeThreadName: false,
                        //     newThreadName: ''
                        // })
                        setShowPermission(false)
                        setCheck1(false)
                        setCheck2(false)
                    }}
                    onBackdropPress={() => {
                        // this.setState({
                        //     changeThreadName: false,
                        //     newThreadName: ''
                        // })
                        setShowPermission(false)
                        setCheck1(false)
                        setCheck2(false)

                    }}
                    style={{ justifyContent: "center", alignItems: "center", }}
                >
                    <View style={{
                        borderRadius: 6,
                        backgroundColor: "#fff",
                        width: "80%",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: 30,
                
                        paddingBottom: 40,
                    }}>
                        <View style={{
                            width:"100%",justifyContent:"center",
                            alignItems:"center",
                        }}>
                            <Text style={{fontSize:16,fontWeight:"500",textAlign:"center"}}>
                                Quyền tạo bình chọn
                            </Text>
                        </View>
                        
                        <View style={{
                            padding:20,
                            // backgroundColor:"#ccc",
                        }}>
                            <TouchableOpacity style={{
                                // backgroundColor:"red",
                                width:"100%",
                                // marginBottom:10,
                                flexDirection:"row",
                                justifyContent:"space-around",
                                alignItems:"center",
                                // backgroundColor:"#ccc",
                                paddingTop:10,
                                paddingBottom:10,

                            }}
                                onPress={()=>{
                                    setCheck1(true)
                                    setCheck2(false)
                                    setWhoCanCreatePollMessage("only_leader")
                                }}
                            >
                                <Text style={{
                                    flex:2,
                                    fontSize:16
                                }}>Chỉ trưởng/phó nhóm</Text> 
                                 <View style={{}}>
                                    {
                                        check1 || whoCanCreatePollMessage ==="only_leader"
                                        ?
                                        <Feather color='green' size={20} name='check-circle' style={{}} />
                                        :
                                        <Entypo color='#00A48D' size={20} name='circle' style={{}} />

                                    }
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                // backgroundColor:"red",
                                width:"100%",
                                // marginBottom:10,
                                flexDirection:"row",
                                justifyContent:"space-around",
                                alignItems:"center",
                                // backgroundColor:"#ccc",
                                paddingTop:10,
                                paddingBottom:10,

                            }}
                                onPress={()=>{
                                    setCheck1(false);
                                    setCheck2(true);
                                    setWhoCanCreatePollMessage("all")
                                }}
                            >
                                <Text style={{
                                    flex:2,
                                    fontSize:16
                                }}>Tất cả mọi người</Text> 
                                <View style={{}}>
                                    {
                                        check2 || whoCanCreatePollMessage === "all"
                                        ?
                                        <Feather color='green' size={20} name='check-circle' style={{}} />
                                        :
                                        <Entypo color='#00A48D' size={20} name='circle' style={{}} />

                                    }

                                </View>

                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection:"row",
                            position:"absolute",
                            padding:10,
                            bottom:0,
                            right:0,
                        }}>
                            <TouchableOpacity style={{
                                marginRight:10,
                            }}
                            onPress={handleSubmitWhoCanEditThread}
                            >
                                <Text style={{ fontSize: 16, color: '#00A48D' }}>
                                    Xác nhận
                                    </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={()=>{
                                setShowPermission(false)
                                setCheck1(false)
                                setCheck2(false)
                            }}
                            >
                                <Text style={{ fontSize: 16, color: 'red' }}>
                                    Hủy bỏ
                                    </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>)
        } catch (error) {
            return null;
        }

    }
    return (
        <View>
             <TouchableOpacity
                    style={{
                        paddingHorizontal: 10,
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                    delayPressIn={0} delayPressOut={0}
                    onPress={handleShowPermission}>
                    <MaterialCommunityIcons name='vote' size={25} color='#00A48D' />

                    <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15 }}>
                        Quyền tạo bình chọn
                                </Text>


                </TouchableOpacity>
                {permission()}
        </View>
    )
}

export default SettingThreadChangeSendMessage

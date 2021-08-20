import React, { Component } from 'react';
import {Text, ScrollView, StyleSheet, View, Image} from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as MediaLibrary from 'expo-media-library';
import COLORS from '../../../shared/colors';
import {PrimaryButton, SecondaryButton} from '../components/Button';

class RegisterScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: ''
        };
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='user-plus'
                type='font-awesome'
                iconStyle={{color: tintColor}}
            />
        )
    }

    getImageFromCamera = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const cameraRollPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            const capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri); 
            } 
        }
    }

    getImageFromGallery = async () => {
        //const cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const cameraRollPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraRollPermissions.status === 'granted') {
            const capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [1, 1]
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri); 
            } 
        }
    }


    processImage = async (imgUri) => {
        const processedImage = await ImageManipulator.manipulateAsync(
            imgUri, 
            [{resize: {width:400}}], 
            {format: ImageManipulator.SaveFormat.PNG}
        );
        // Note: not checking for asynchronous result of writing image to gallery
        // See alternate method below for getting result from await
        MediaLibrary.saveToLibraryAsync(processedImage.uri);
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri});
        //this.writeImageToGallery(processedImage.uri);
    }


    // More elaborate way to manage saving image to Library using MediaLibrary.createAssetAsync
    /*
    writeImageToGallery = async (imgUri) => {
        const cameraRollPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraRollPermissions.status === 'granted') {
            const savedImage = await MediaLibrary.createAssetAsync(imgUri);
        }
    }
    */


    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify(
                {username: this.state.username, password: this.state.password}))
                .catch(error => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch(
                error => console.log('Could not delete user info', error)
            );
        }
        this.props.navigation.navigate('LogInScreen')
    }

    render() {
        const imageUrl = this.state.imageUrl;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>

                    {!imageUrl ? (
                            <Image
                                source={require('../../../assets/images/placeholder.png')}
                                style={styles.image}
                                resizeMode='contain'
                            />
                        ) : (
                            <Image
                                source={{ uri: imageUrl }}
                                style={styles.image}
                                resizeMode='contain'
                            />
                        )}


                        <PrimaryButton
                            title='Camera'
                            onPress={this.getImageFromCamera}
                        />
                        <PrimaryButton
                            title='Gallery'
                            onPress={this.getImageFromGallery}
                        />
                    </View>
                    <Input
                        placeholder='Username'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={username => this.setState({username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Password'
                        leftIcon={{type: 'font-awesome', name: 'key'}}
                        onChangeText={password => this.setState({password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='First Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={firstname => this.setState({firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Last Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={lastname => this.setState({lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <Input
                        placeholder='Email'
                        leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                        leftIconContainerStyle={styles.formIcon}
                    />
                    <CheckBox
                        title='Remember Me'
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton}>
                        <PrimaryButton
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={
                                <Icon
                                    name='user-plus'
                                    type='font-awesome'
                                    color='#fff'
                                    iconStyle={{marginRight: 10}}
                                />
                            }
                            buttonStyle={{backgroundColor: '#5637DD'}}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}








const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        paddingHorizontal: 50,
        justifyContent: 'space-between',
        paddingBottom: 30
    },
    indicatorContainer: {
        height: 50,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentIndicator: {
        height: 12,
        width: 30,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        marginHorizontal: 5,
    },
    indicator: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: COLORS.grey,
        marginHorizontal: 5,
    },
    container: {
        justifyContent: 'center',
        margin: 10
    },
    formIcon: {
        marginRight: 10
    },
    formInput: {
        padding: 8
    },
    formCheckbox: {
        margin: 8,
        backgroundColor: null
    },
    formButton: {
        margin: 20,
        marginRight: 40,
        marginLeft: 40
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10
    },
    image: {
        alignSelf: 'center',
        height: 60,
        width: 60,
        overflow: 'hidden',
        borderColor: '#636e72',
        borderWidth: 1,
        borderRadius: 5
    }
});

export default RegisterScreen;

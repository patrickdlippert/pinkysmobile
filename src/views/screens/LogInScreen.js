import React, { Component } from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import { Input, CheckBox, Button, Icon } from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import COLORS from '../../../shared/colors';
import {PrimaryButton, SecondaryButton} from '../components/Button';

class LogInScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        };
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name='sign-in'
                type='font-awesome'
                iconStyle={{color: tintColor}}
            />
        )
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            ).catch(error => console.log('Could not save user info', error));
        } else {
            SecureStore.deleteItemAsync('userinfo').catch(
                error => console.log('Could not delete user info', error)
            );
        }
        this.props.navigation.navigate('HomeScreen')

    }
    
    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then(userdata => {
                const userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            });
    }
    
    render() {
        return (

            <View style={styles.container}>
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
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                />
                <View style={styles.formButton}>
                    <PrimaryButton
                        onPress={() => this.handleLogin()}
                        title='Login'
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        buttonStyle={{backgroundColor: '#5637DD'}}
                    />
                </View>
                <View style={styles.formButton}>
                    <SecondaryButton
                        onPress={() => this.props.navigation.navigate('RegisterScreen')}
                        title='Register'
                        type='clear'
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                color='blue'
                                iconStyle={{marginRight: 10}}
                            />
                        }
                        titleStyle={{color: 'blue'}}
                    />
                </View>
            </View>
                
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
        width: 60,
        height: 60
    }
});

export default LogInScreen;
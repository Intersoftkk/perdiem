import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { styles } from '../components/CommonStyles';
import RBSheetContent from '../components/RBSheetContent';
import { getMyObject, removeValue } from '../components/AsyncStorage';
import { parseApiResponseMessage } from '../components/Api';
import CustomButton from '../components/CustomButton';

export default class ProfileScreen extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        google: false
    }
    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            let name = await getMyObject('name');
            let email = await getMyObject('email');
            let password = await getMyObject('password');
            let google = await getMyObject('google');
            this.setState({
                name: parseApiResponseMessage(name), 
                email: parseApiResponseMessage(email), 
                password: parseApiResponseMessage(password),
                google: google != null ? parseApiResponseMessage(google) : false,
            }, () => {
                console.log(this.state.google);
            });
        })
    } 
    logout = async() => {
        await removeValue('name');
        await removeValue('email');
        await removeValue('password');
        if(this.state.google) {
            await removeValue('google');
        }
        this.props.navigation.navigate("LoginScreen");
    }
    render = () => (
        <SafeAreaView style={styles.container}>
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.centerList, {alignItems: 'flex-start'}]}
            >
                <Text
                    style={[styles.itemTitleStyle, {fontSize: 20, alignSelf: 'center'}]}
                >Profile</Text>
                <View style={{height: 40}} />
                <View style={[styles.rowStyle, {width: '100%'}]}>
                    <Text
                        style={[styles.itemTitleStyle, {fontSize: 20}]}
                    >Name</Text>
                    <Text
                        style={[styles.itemBodyStyle, {fontSize: 17}]}
                    >{this.state.name}</Text>
                </View>
                <View style={{height: 15}} />
                <View style={[styles.rowStyle, {width: '100%'}]}>
                    <Text
                        style={[styles.itemTitleStyle, {fontSize: 20}]}
                    >Email</Text>
                    <Text
                        style={[styles.itemBodyStyle, {fontSize: 17}]}
                    >{this.state.email}</Text>
                </View>
                {!this.state.google && <View style={{height: 15}} />}
                {!this.state.google && <View style={[styles.rowStyle, {width: '100%'}]}>
                    <Text
                        style={[styles.itemTitleStyle, {fontSize: 20}]}
                    >Password</Text>
                    <Text
                        style={[styles.itemBodyStyle, {fontSize: 17}]}
                    >{this.state.password}</Text>
                </View>}
                <View style={{height: 40}} />
                <CustomButton
                  text="Logout"
                  color={'#0000FF'}
                  width="100%"
                  fontSize={15}
                  borderRadius={10}
                  onPress={this.logout}
                />
                <View style={{marginBottom: 100}} />
            </ScrollView>
            <RBSheetContent
                additionalStyle={styles.footerBottom} 
                showFocused={false}
                rbSheet={false}
                profileFocused={true}
                focusShow={() => this.props.navigation.goBack()} 
                focusProfile={() => undefined} 
            />
        </SafeAreaView>
    )
}
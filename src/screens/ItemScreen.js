import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Dimensions, BackHandler } from "react-native";
import { styles } from "../components/CommonStyles";
import VectorIcons from "../components/VectorIcons";
import RBSheetContent from "../components/RBSheetContent";
import RBSheet from "react-native-raw-bottom-sheet";

export default class ItemScreen extends React.Component {
    state = {
        oneLine: false,
        todoFocused: false,
        postFocused: false
    }
    async componentDidMount() {
        this.props.navigation.addListener('focus', async () => {
            BackHandler.addEventListener('hardwareBackPress', () => {
                this.props.navigation.navigate("HomeScreen", {
                    todoFocused: this.props.route.params ? this.props.route.params.todoFocused : true,
                    postFocused: this.props.route.params ? this.props.route.params.postFocused : false,
                });
                return true;
            })
            this.setState({
                todoFocused: this.props.route.params ? this.props.route.params.todoFocused : true,
                postFocused: this.props.route.params ? this.props.route.params.postFocused : false,
            });
        })
    } 
    componentWillUnmount() {
        
        BackHandler.removeEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate("HomeScreen", {
                todoFocused: this.props.route.params ? this.props.route.params.todoFocused : true,
                postFocused: this.props.route.params ? this.props.route.params.postFocused : false,
            });
            return true;
        })
    }
    render = () => (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.props.navigation.navigate("HomeScreen", {todoFocused: true, postFocused: false})}
            >
                <VectorIcons
                    name="arrow-back"
                    size={30}
                    color="#0000FF"
                />
            </TouchableOpacity>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.centerList}
            >
                <View
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        backgroundColor: '#ececec',
                        borderWidth: 1,
                        borderColor: '#ececec',
                        padding: 10,
                        borderRadius: 10,
                        width: Dimensions.get('screen').width * 0.9
                    }}
                >
                    {
                        this.props.route.params && this.props.route.params.item.title &&
                        <Text
                            style={styles.itemTitleStyle}
                        >{this.props.route.params.item.title}</Text>
                    }
                    <View style={{height: 30}} />
                    {
                        this.props.route.params && this.props.route.params.item.body && this.props.route.params.item.body != '' &&
                        <Text
                            style={[styles.itemBodyStyle, {width: '100%'}]}
                        >{this.props.route.params.item.body}</Text>
                    }
                </View>
            </ScrollView>
            
            <RBSheet
                ref={ref => {
                    this.RBSheet = ref;
                }}
                height={250}
                openDuration={250}
                customStyles={{
                    container: styles.rbSheetContainer
                }}
            >
                <RBSheetContent 
                    rbSheet={true}
                    todoFocused={this.state.todoFocused} 
                    postFocused={this.state.postFocused} 
                    focusTodo={() => this.setState({todoFocused: true, postFocused: false, todos: [], posts: []}, () => this.props.navigation.navigate("HomeScreen", {todoFocused: true, postFocused: false}))} 
                    focusPosts={() => this.setState({todoFocused: false, postFocused: true, todos: [], posts: []}, () => this.props.navigation.navigate("HomeScreen", {todoFocused: false, postFocused: true}))}                     
                />
            </RBSheet>
            <RBSheetContent
                additionalStyle={styles.footerBottom} 
                showFocused={false}
                rbSheet={false}
                profileFocused={false}
                focusShow={() => {
                    this.RBSheet.open();
                }}
                focusProfile={() => this.props.navigation.navigate("ProfileScreen")} 
            />
        </SafeAreaView>
    )
}
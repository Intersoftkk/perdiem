import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { styles } from "../components/CommonStyles";
import VectorIcons from "../components/VectorIcons";
import RBSheetContent from "../components/RBSheetContent";

export default class ItemScreen extends React.Component {
    state = {
        oneLine: false
    }
    render = () => (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.props.navigation.goBack()}
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
            <RBSheetContent
                additionalStyle={styles.footerBottom} 
                showFocused={false}
                rbSheet={false}
                profileFocused={false}
                focusShow={() => this.props.navigation.goBack()} 
                focusProfile={() => this.props.navigation.navigate("ProfileScreen")} 
            />
        </SafeAreaView>
    )
}
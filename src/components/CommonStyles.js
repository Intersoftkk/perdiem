import { Dimensions } from "react-native";

export const styles = {
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1
    },
    centerAlign: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    googleSignInButtonStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: Dimensions.get('screen').width * 0.9,
        padding: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 15
    },
    googleSignInTextStyle: {
        fontSize: 20,
        color: '#808080',
        fontWeight: 'bold'
    },
    splashStyle: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerStyle: {
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        width: Dimensions.get('screen').width,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerTextStyle: {
        color: '#017bff',
        fontSize: 20
    },
    footerBottom: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#ececec',
        elevation: 1,
        bottom: 0
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    greetingMessage: {
        fontSize: 20,
        color: '#000'
    },
    greetingMessageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    listTitleTextStyle: {
        fontSize: 15,
        color: '#000'
    },
    rbSheetContainer: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 90,
        borderRadius: 15,
        alignSelf: 'center',
        width: Dimensions.get('screen').width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80, 
        paddingHorizontal: 20
    },
    itemTitleStyle: {
        fontSize: 15,
        color: '#000',
        fontWeight: 'bold'
    },
    itemBodyStyle: {
        fontSize: 15,
        color: '#000'
    },
    listItemStyle: {
        borderWidth: 1,
        borderColor: '#ececec',
        backgroundColor: '#ececec',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
        borderRadius: 10
    },
    greetingsExtraStyle: {color: '#017bff', fontSize: 25, fontWeight: 'bold'},
    greetingsExtraNameStyle: {color: '#808080', fontSize: 25, fontWeight: 'bold'}
}
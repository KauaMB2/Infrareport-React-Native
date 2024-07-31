import { View, StyleSheet, Image, Text } from 'react-native'
import AvatarIcon from "../../../../../assets/AvatarIcon.png"
import { useSelector } from 'react-redux'

const UserPicture = ({userName, userPoints, userProfileMedal, userProfileCategory}) => {
    return (
        <View style={styles.container}>
            <View style={styles.PhotoNameView}>
            <Image
            source={AvatarIcon} // Replace with your image path
            style={styles.avatarIcon}
            resizeMode="cover"
            />
            <Text style={styles.textName}>{userName}</Text>
        </View>
        <View style={styles.profileLevelView}>
            <View>
            <Text style={styles.pointsText}>{userPoints} - {userProfileCategory}</Text>
            </View>
            <Image source={userProfileMedal} style={{ width: 50, height: 50 }} />
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:"100%" 
    },
    PhotoNameView:{
        alignItems: "center", width: "100%"
    },
    textName:{
        fontSize: 20,
        fontWeight: "700",
    },
    avatarIcon:{
        borderRadius: 50, 
    },
    profileLevelView:{
        alignItems: "center",
        width: "100%",
        marginVertical: 15,
    },
    pointsText:{
        fontSize: 16,
        fontWeight: "700",
    }
})

export default UserPicture
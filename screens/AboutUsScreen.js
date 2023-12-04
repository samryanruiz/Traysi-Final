// AboutUsScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Image,
} from "react-native";

const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* First Section */}
      <View style={styles.section}>
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.paragraph}>
          This mobile application, designed specifically for the Philippines,
          offers a solution to the challenges associated with tricycle
          transportation. It provides users with a reliable fare calculation
          system that leverages their current location and desired destination.
          Using these inputs, the app calculates fares based on the distance
          traveled and employs the Philippines tricycle fare matrix to determine
          accurate pricing. This approach ensures that commuters consistently
          receive honest and transparent fare estimates for their tricycle
          rides, promoting accessibility and fairness within the local
          transportation sector.
        </Text>
      </View>

      {/* Second Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Our Team</Text>
        <Text style={styles.paragraph2}>
          Agripa, Vince Kurt {"\n"}
          4th Year Computer Engineering {"\n"}
          Data Science Track Elective {"\n\n"}
          Cabanos, Renzo James M. {"\n"}
          4th Year Computer Engineering {"\n"}
          Data Science Track Elective {"\n\n"}
          Macamay, Kurt Daniel L. {"\n"}
          4th Year Computer Engineering {"\n"}
          Technopreneurship Elective {"\n\n"}
          Ruiz, Sam Ryan C. {"\n"}
          4th Year Computer Engineering {"\n"}
          Data Science Track Elective {"\n\n"}
          Sumayan, Brian {"\n"}
          4th Year Computer Engineering {"\n"}
          Technopreneurship Elective
        </Text>
      </View>

      {/* Third Section */}
      <View style={styles.section}>
        <Text style={styles.title}>Connect With Us</Text>
        <View style={styles.socialMediaContainer}>
          {/* Social Media Logos */}
          <Image
            source={require("../assets/fb.png")}
            style={styles.socialMediaLogo}
          />
          <Image
            source={require("../assets/x.png")}
            style={styles.socialMediaLogo}
          />
          <Image
            source={require("../assets/inst.png")}
            style={styles.socialMediaLogo}
          />
          <Image
            source={require("../assets/in.png")}
            style={styles.socialMediaLogo}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    color: "#5FC0DE",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  paragraph: {
    color: "#5FC0DE",
    fontSize: 14,
    textAlign: "justify", // Set the text alignment to justify
  },
  paragraph2: {
    color: "#5FC0DE",
    fontSize: 14,
    textAlign: "center", // Set the text alignment to justify
  },
  socialMediaContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  socialMediaLogo: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
});

export default AboutUsScreen;

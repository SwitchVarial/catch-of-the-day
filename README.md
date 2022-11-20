# Catch of the day -mobiilisovellus

Sovelluksen tarkoitus on kalareissujen ja kalapaikkojen tallentaminen. Sovellus nöyttää reissun alkupisteen, loppupisteen ja saatujen kalojen sijainnin. Sovellus poikkeaa melko paljon aluperöisestä suunnitelmasta laajuuden osalta. Ne toiminot, mjotka oli jörkevää toteuttaa opintojakson puitteussa on saatu valmiiksi

# Käytetyt teknologiat

Projektissa on käytetty useita eri teknologioita, jotka ovat tulleet kurssilta tutuksi. Niitä on käyety ehkä hiukan laajemmin kuin opintojakson aikana. Esittelen mielestäni tärkeimmät teknologiat, joiden käyttössä oli ero opintojakson aiheisiin.

**React Navigation**: Projetissa on käytetty Bottom-Tabs navigaatiota ja sen sisällä Stack-navigaatiota eli ns. nested navigation. Navigaation sisällä liikutetaan myös params:ja, siirretään taista navigaatiota eri paikkaan push-komennolla sekä nollataan näyttöjä, jotta uuseien kalareissujen tallennus onnistuu oikein.

**Google Fonts**: Soveluksessa on custon kirjasin Google Fontsista.

**DropDown Select List**: Käytetty valmista dropdown komponettia.

**Stopwatch Timer**: Ajan mittaamiseen käytetty StopWatch Timer komponettia. Loppujenlopuksi en voinut käyttää sen mittaamaa aikaa tallenkseen, koska sain virheilmoituksen, jot aen osannut ratkaista. Se näyttää kuitenin reissulla kuluvan ajan. Lopullinen tieto tallenntetaan alku- ja loppuajan perusteella.

**React Native Maps**: Melkolailla samalla tavalla kuin kurssilla, mutta custon markerit omista png-tiedostoista. Toki kartta renderöidään flatlistin sisään markereineen.

**React Native Elements**: Käytetty muutamaa komponettia, mutta loppujen lopuksi hyöty oli melko vähäinen. Napit oli ehkä helpompi tehdä.


    "@expo-google-fonts/m-plus-rounded-1c": "^0.2.2",
    "@react-navigation/bottom-tabs": "^6.4.0",
    "@react-navigation/native": "^6.0.13",
    "@react-navigation/native-stack": "^6.9.1",
    "@rneui/base": "^4.0.0-rc.7",
    "@rneui/themed": "^4.0.0-rc.7",
    "expo": "~46.0.16",
    "expo-font": "~10.2.0",
    "expo-location": "~14.3.0",
    "expo-status-bar": "~1.4.0",
    "expo-updates": "~0.14.7",
    "firebase": "9.6.11",
    "react": "18.0.0",
    "react-native": "0.69.6",
    "react-native-dotenv": "^3.3.1",
    "react-native-dropdown-select-list": "^2.0.1",
    "react-native-maps": "0.31.1",
    "react-native-safe-area-context": "4.3.1",
    "react-native-screens": "~3.15.0",
    "react-native-stopwatch-timer": "^0.0.21"

#


import React, { Component } from 'react';
import {fromJS} from 'immutable';
import { AdMobBanner } from 'react-native-admob';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
    BackAndroid
} from 'react-native';
var ResponsiveImage = require('react-native-responsive-image');
import Share from 'react-native-share';
import Button from '../components/common/Button';
import Card from '../components/common/Card.js';
import CardSection from '../components/common/CardSection.js';
import Amenity from '../components/amenity_filter/Amenity.js';
import ParkListDetail from '../components/park_list/ParkListDetail.js'
import FilterDetail from '../components/amenity_filter/FilterDetail';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';



class ParkDetail extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    console.log('parkDetail Unmount!')
    BackAndroid.addEventListener('hardwareBackPress', this.pushToadCTA);
  };

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.pushToadCTA);
  }

  pushToadCTA() {
    Actions.adCTA();
    return true;
  }


  renderFilters() {
    currentParkAmenities = this.props.currentPark.amenities.split(',').map((amenity) => amenity.trim());
    const matchingAmenities = [];
    const nonMatchingAmenities = [];

    //push matching amenities not rendered as images into array for rendering.
    this.props.amenities.map(filter => {
      if(currentParkAmenities.indexOf(filter.name) > -1 && currentParkAmenities.indexOf(filter.name) > 2) {
        // console.log(filter);
        filter.checked = true;
        matchingAmenities.push(filter);
      }
    });

    //for checked and non checked showing amenities added and not added.
    //
    // this.props.amenities.map(filter => {
    //   if(currentParkAmenities.indexOf(filter.name) === -1){
    //     // console.log(filter);
    //     filter.checked = false;
    //     nonMatchingAmenities.push(filter);
    //   }
    // })
    // const amenities = matchingAmenities.concat(nonMatchingAmenities);

    const amenities = matchingAmenities;
    return amenities.map(filter => <FilterDetail checked={filter.checked} disabled={true} key={filter.name} filter={filter.name}/>)
  }


  componentDidMount(){
    const {currentPark} = this.props;
    console.log(this.bannerError);
    this.props.dispatch({type: 'UPDATE_SCENE', state: this.props.name});
  }

  renderAmenities({amenities}){
    let amenityIndex = 0;
    return amenities.split(', ').map(amenity => <Amenity index={amenityIndex++} key={amenity} amenity={amenity}/>)
  }

  onBackPress() {
    Actions.adCTA();
  }

  onSharePress() {
    let shareOptions = {
      title: "Park Bark is Awesome",
      message: "Hello!",
      url: "http://parkbarkapp.site",
      subject: 'Check out ' + this.props.currentPark.title
    };
    Share.open(shareOptions);
  }

  surveyPress() {
    // console.log(this.props);
    const title = this.props.currentPark.title;
    this.props.dispatch({type: 'SET_PARK_SURVEY', state: title});
    Actions.surveyNumDogs();
}

  onDetailPress() {
    //TODO: set url on android platform
    lat = parseInt(this.props.currentPark.address.split(',')[0]);
    long = parseInt(this.props.currentPark.address.split(',')[1]);

    //IOS
    // var url = 'http://maps.apple.com/?daddr=' + this.props.currentPark.address;

    Linking.openURL(`http://maps.google.com/maps?daddr=${this.props.currentPark.address}`);
  }

  render(){
    const {currentPark} = this.props;
    return (
    <View style={styles.container}>
        <ScrollView bounces={false} style={styles.scrollview}>
            {/* Start top image stack */}
            <View style={styles.parkImage}>
              <ResponsiveImage
                  source={{uri: currentPark.image}}
                  initHeight="225"
              />
            </View>

            <View style={{position: 'absolute', top: 0}}>
                <ResponsiveImage
                    source={require('../img/overlay@3x.png')}
                    initHeight='60'
                    initWidth='1000'
                />
            </View>

            <TouchableOpacity
                onPress={this.onBackPress.bind(this)}
                style={{position: 'absolute', top: 20, left: 20}}>
              <Image style={{width: 25, height: 25, padding: 10}} source={require('../img/back-arrow@3x.png')}/>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={this.onSharePress.bind(this)}
                style={{position: 'absolute', top: 20, right: 20}}>
              <Image style={{width: 25, height: 27, padding: 10}} source={require('../img/share@2x.png')}/>
            </TouchableOpacity>
            {/* End top image stack */}

          <ParkListDetail key={currentPark.title} onPress={this.onDetailPress.bind(this)} title={currentPark.title} address={currentPark.address} address_display={currentPark.address_display} distance={currentPark.distance}/>
          <Card>
            {this.renderAmenities(currentPark)}
          </Card>
          <Card>
            <View style={{flex: 1, flexDirection: 'column'}}>
            <CardSection>
            <AdMobBanner
              bannerSize="banner"
            //   adUnitID="ca-app-pub-3940256099942544/6300978111" // test
              adUnitID="ca-app-pub-7642882868968646/2620967210" //Park Bark test
              testDeviceID="EMULATOR"
              didFailToReceiveAdWithError={this.bannerError} />
            </CardSection>
              <CardSection>
                  <View style={styles.parkDetails}>
                    <Text style={styles.detailsTitle}>PARK DETAILS</Text>
                    <Text style={styles.detailsText}>{currentPark.details}</Text>
                  </View>
              </CardSection>
            </View>
          </Card>
          {this.renderFilters()}
        </ScrollView>
        <Button
          bgimage={require('../img/orange-gradient.png')}
          icon={require('../img/check-in@3x.png')}
          text={'  CHECK IN '}
          textColor={'#fff'}
          alignSelf={'flex-end'}
          fontSize={14}
          font={'Source Sans Pro 700'}
          onPress={this.surveyPress.bind(this)}
        />
    </View>
    )
  }
};

const styles = {
  container: {
     flex: 1,
     flexDirection: 'column',
     backgroundColor: '#fff',
  },
  scrollview: {
    flex: 1,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1,
    height: 20
  },
  parkImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      zIndex: 0
  },
  parkDetails: {
    borderColor: '#f0f0f0',
    borderBottomWidth: 0,
    borderTopWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginTop: 10
  },
  detailsTitle: {
    fontFamily: 'ArchivoNarrow-Bold',
    fontSize: 11,
    color: '#838383',
    lineHeight: 19,
    paddingTop: 20
  },
  detailsText: {
    fontFamily: 'Source Sans Pro 200',
    fontSize: 14,
    color: '#5e5e5e',
    lineHeight: 20
  }
}

const mapStateToProps = (state) => {
  return {
    amenities: state.getIn(['filter','amenities']).toJS(),
    currentPark: state.getIn(['map', 'location', 'parks']).find((park) => park['title'] === state.getIn(['parkdetail','current_park'])),
    position: state.getIn(['map','position']),
  }
};

export default connect(mapStateToProps)(ParkDetail);

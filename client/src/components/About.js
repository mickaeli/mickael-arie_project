import React, { useEffect } from 'react';
import HeroImage from './HeroImage';
import ImgNextToText from './ImgNextToText';
import List from './List';
import winter from '../img/winter.jpg';
import mountain from '../img/mountain.jpg';
import sun from '../img/sun.jpg';
import desktop from '../img/desktop.jpg';
import { Container, Row, Col } from 'react-bootstrap';

import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import logo from '../img/logo2.jpg';
import help from '../img/help.jpg';

const About = () => {

  useEffect(() => {
    document.title = 'About Gooder'
  }, [])


  const header1 = 'Not only do we care about people. We believe in them'
  const paragraph = 'We in Gooder\u2122 believe that people and communities can build meaningful futures through the use of technology. ' + 
  'There are no limitations when people are coming together for a good cause. That is why we established Gooder\u2122 - a unique, new way of doing good, together'
  const header2 = 'So.. who we are and what are we all about?'
  const paragraphs = { 
    par1: 
      'Gooder\u2122 is a social network for good-doing & good causes. ' +
      'Whether you need help, have something to offer or run a charity organization - ' + 
      'Gooder\u2122 is the place for you. After logging in, you\'ll be able to build a personal ' + 
      'or organizational profile page, connect with others, socialize and make good. ',
    par2:
      'Gooder\u2122 is the best place for anyone interested in asking for or doing good actions, ' + 
      'gathering around good causes, getting to know people & help. ' +
      'By becoming a Gooder you\'ll be able to explore the variety of possibilities a social network can offer - ' +
      'in an easy, interactive, modern & fun way - while doing good and improving yourself & the world. ',
    par3:
      'In Gooder\u2122 you\'ll be able to contribute by yourself or join others in a collective manner for a good cause. ' +
      'Explore the variety of options of assembling new or existing groups around the causes ' +
      'you interested in. Building communities have never been so easy! ',
    par4:
      'We believe that everyone, anywhere can help, contribute & make the world a better place, given the right tools. ' +
      'Join in & Socialize your good-doing - as simple but as beautiful as that. ',
    par5:
      'Gooder\u2122 were made as a final project at Hadassah Academic College - Campus Strauss, ' +
      'Computer Science department, by Mickael Israel (...) & Arie Noyoz (....).'
  }

  const header3 = '“There is no exercise better for the heart than reaching down and lifting people up.”'

  const listItems = {
    item1: {
      logo: <Image className='logo' src={logo} alt='logo'/>,
      header: <h1>BECOME A GOODER</h1>,
      paragraph: <p>What does becoming a Gooder means? <br/> It's all about these 3 easy & fun steps!</p>
    },
    item2: {
      logo: <FontAwesomeIcon className='logo' icon={faUser} size='4x' color='rgba(51, 50, 50, 0.81)' aria-hidden="true" />,
      header: <h1>CREATE ACCOUNT</h1>,
      paragraph: <p>This is your own personal space! fiil in your details (personal or organizational) and start posting, 
                    adding content, publishing your thoughts & much much more! make yourself at home!</p>
    },
    item3: {
      logo: <FontAwesomeIcon className='logo' icon={faComments} size='3x' color='rgb(0, 145, 219)' aria-hidden="true" />,
      header: <h1>SOCIALIZE</h1>,
      paragraph: <p>Experience the fun and excitement of connecting with people from all over the world! 
                    Invite your friends or make a new ones, join or start a community, 
                    get involved in conversations, collaborate with others & more. 
                    Life meant to be lived together!</p>
    },
    item4: {
      logo: <Image className='logo' src={help} alt='help'/>,
      header: <h1>HELP</h1>,
      paragraph: <p>Become a true Gooder! ask for what you need or offer what you can, 
                    Touch someone's life, help others or get help & see how your contribution 
                    is shaping the world for the best. Make a difference!</p>
    }
  }
  
  return (
    <div className='about'>
      <HeroImage header={(<h1>{header1}</h1>)} paragraph={<p>{paragraph}</p>} url_img={winter} heroType='withArrow' heroSize='large' />  
      <div id='down'>
        <ImgNextToText url_img={mountain} header={header2} paragraphs={paragraphs} imgSize='large' hasButton={false} />
      </div>
      <HeroImage header={(<h1>{header3}</h1>)} paragraph={(<p>John Holmes</p>)} url_img={sun} heroType='bg_blue2' heroSize='small' hasSigninButton />
      <Container fluid className='list-next-to-image'>
        <Row>
          <Col className='col-without-pad' xs={12} lg={{ span: 6, offset: 1 }}>
            <List listItems = {listItems} />
          </Col>
          <Col className='col-without-pad' xs={12} lg={5}>
            <HeroImage paragraph={(<p>We believe in the potential of what people can achieve</p>)} url_img={desktop} heroType='desktop' heroSize='large' hasSignupButton />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
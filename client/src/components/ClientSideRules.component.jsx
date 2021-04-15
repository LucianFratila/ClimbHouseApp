
import React, {useEffect,useState,useRef} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import ProductsSelectForm from './ProductsSelectForm.component'
import SubscriptionButton from './SubscriptionButton.component'
import DeleteProdsHistory from './DeleteProdsHistory.component'
import { FaEnvelope, FaUserCircle,FaUsers,FaCartPlus,FaCalendarCheck, FaTimesCircle, FaTimes, FaClock, FaTools } from 'react-icons/fa';
import { IoMdWalk,IoMdTimer } from "react-icons/io";
import StopButton from './StopButton.component'
import ResetButton from './ResetButton.component'
import Image from 'react-bootstrap/Image'
import logo from "../Logo-Climb-House-scris-white.png";
import CreateClient from './CreateClient.component'
import ReCAPTCHA from 'react-google-recaptcha'

import Button from 'react-bootstrap/Button';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;




function ClientSideRules(props) {
    
    
    const[alert, setAlert] = useState(false);
    const[agree,SetAgree] = useState(false);

    const refresh = ()=>{
        setAlert(true)
        
    }

    return(
        <Container style={{backgroundColor:'black', color:'white',  paddingLeft:'20px', paddingRight:'20px'}} fluid>

  <Row>
    <Col>
    
    <div>
               <h1 >Bine ați venit la <Image style={{margin:'auto', width:'150px'}} src={logo} fluid /> </h1>
               <span>
               <div>
        
        <p><span style={{fontWeight: 400}}>Sala noastră de aventură indoor cu trasee de cățărat pentru adulți și copii.</span></p>
        
        <p><strong>Climb House</strong><span style={{fontWeight: 400}}> este construit după un concept care a luat naștere în vest. Ne propunem să aducem cățăratul și sportul, mai aproape de orașele mari și să oferim o alternativă sportivă și distractivă de petrecere a timpului liber.&nbsp;</span></p>
        
        <p><span style={{fontWeight: 400}}>Avem o experiență de peste 10 ani în alpinism utilitar și lucrul la înălțime și am mai construit astfel de centre în Germania, Anglia, Scoția, Irlanda&nbsp;și Finlanda.</span></p>
        
        <p><span style={{fontWeight: 400}}>Echipamentele de autoasigurare sunt achizitionate din UK de la un producător autorizat cu o experiență de peste 25 de ani.&nbsp;</span><a href="https://safedownautobelay.com/about-us/"><span style={{fontWeight: 400}}>https://safedownautobelay.com/about-us/</span></a><span style={{fontWeight: 400}}>.&nbsp;</span></p>
        <p><span style={{fontWeight: 400}}>Acestea sunt anual verificate de o echipă de experți Safedown&nbsp;după un protocol strict.&nbsp;</span></p>
        
        <p><strong>Care sunt masurile de sigurantă adoptate pentru activitatea de cățărare?</strong></p>
        <ul>
          <ul>
            <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>avem stabilit un maxim de 20 de persoane la 16 trasee de catarat&nbsp;și un slide</span></li>
            <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>lucram cu cele mai sigure echipamente de autoasigurare din lume</span></li>
            <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>sistemele de autoasigurare sunt asigurate&nbsp;în 2 puncte&nbsp;</span></li>
            <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>carabiniera de prindere este 3 lock adică necesită 3 pasi pt&nbsp;deblocare evitându-se astfel complet deblocările accidentale</span></li>
          </ul>
        </ul>
        
        <ul>
          <li><strong><span style={{fontWeight: 400}}>accesorioile de escaladă sunt certificate UIAA&nbsp;(</span><strong>International Climbing and Mountaineering Federation)</strong></strong></li>
        </ul>
        
        <ul>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>podeaua spațiului&nbsp;este în 2 culori, delimitându-se astfel zonele de trecere și zonele care trebuie evitate când sunt cățărători pe traseu</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>fiecare traseu este prevăzut cu un sistem de blocare, astfel încât cățărătorii nu pot pleca pe traseu până nu se asigură.</span></li>
        </ul>
        
        <p><span style={{fontWeight: 400}}>&nbsp;Traseele noastre de cățărat sunt accesibile tuturor persoanelor începand cu varsta de 4-5 ani, care au peste 15 kg și o stare de sanatate fizică si psihică bună.</span></p>
        <p><span style={{fontWeight: 400}}>Clienții au acces în Climb House pe propria răspundere, după ce au citit și înțeles Regulamentul. Accesul în sală reprezintă acceptarea regulamentului nostru.&nbsp;</span></p>
        <p><span style={{fontWeight: 400}}>Pentru minorii sub 14 ani, consimtamantul de participare va fi dat de către părinti sau însotitorii adulti prin acordul scris.</span></p>
        <p><span style={{fontWeight: 400}}>Prin urmare, toți participanții sunt obligati să citească si să-și însușească regulile mai jos menționate</span></p>
        <ol>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Greutatea minimă admisă pentru participanți este de 15 kg iar cea maximă este de 150 kg.&nbsp;</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Purtarea hamului este obligatorie la toate traseele mai puțin la slide iar acesta va fi verificat de către personalul Climb House.</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Purtarea căștii este obligatorie&nbsp;</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Atunci când traseele sunt închise cu căsuțele portocalii, se așteaptă ok-ul instructorului, care va asigura cățăratorul. La coborâre se așteaptă ajutorul instructorului care vă va debloca carabiniera și vă va indica următorul tarseu.</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Atunci când triunghiurile de blocare sunt pe podea cu fața galbenă în sus, nu se staționează pe ele. Poziția triunghiurilor galbene pe podea indică faptul că o altă persoană se catară pe traseu iar o coborâre a celui care se catara peste cel care stationeaza în aceasta zonă ar putea conduce la accidentari.</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Podeaua roșie marchează de asemnenea zona unde nu se staționează.</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Echiparea si dezechiparea se face numai de catre personalul Climb House.</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Accesul la sala de cățărare se face doar in prezenta personalului Climb House.</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>La cățărare pozitia corzii de asigurare trebuie sa fie intre brate.</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Carabiniera cu coarda de asigurare va fi montată și demontată doar de catre instructorii Climb House.</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>La cățărare este strict interzisa traversarea traseelor pe orizontala. Cățărătorii trebuie să se rezume la traseul de cățărare ales.</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>În cazul în care nu veti respecta regulile prezentate la instructaj de către personalul autorizat, veți fi oprit din activitate.</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Participantilor nu li se returnează sumele achitate dacă sunt opriți din activitate din cauza nerespectării regulilor.&nbsp;</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>În cazul distrugerii echipamentului de protectie (ham, cască) contravaloarea acestuia va fi suportată de către persoana care l-a închiriat sau de către parinti/însotitori.</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>În situaţia în care, dupa ce a început sesiunea de cățărat, participantul consideră că nu mai poate participa la activităţile sportive, suma achitată nu se returnează.</span></li>
          <li style={{fontWeight: 400}}><span style={{fontWeight: 400}}>Toti participanții trebuie să contribuie prin actiunile si atitudinea lor la siguranța și buna desfășurare a activității. Accidentarea unui cațărător de către un altul este responsabilitatea directă a celor implicati, instructorul/societatea fiind exonerat(a) de orice răspundere.</span></li>
        </ol>
        <p><span style={{fontWeight: 800}}>Am citit și înțeles Regulamentul. Sunteți de accord cu el?</span></p>
        
        
      </div>
               </span>
                
            
            </div>
            
            
    </Col>
    
  </Row>
  <Row hidden={!agree} style={{padding:'10px'}}>
    <CreateClient refresh={refresh} style={{marginLeft:'5px'}}/>
  </Row>
  <hr></hr>
  <span >
  <Button variant="success" size='1.2em' onClick={()=>{SetAgree(true)}}>SUNT de accord.</Button>
  <Button variant="danger" size='1.2em' onClick={()=>{SetAgree(false)}}>NU sunt de accord.</Button>
  </span>
  
  <hr></hr>
  
</Container>
            
    )
}
export default ClientSideRules

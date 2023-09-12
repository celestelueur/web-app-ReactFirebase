//tarfis

const Tarif=()=>{
    return(
        <div style={mystyle.div}>
            <h2 style={mystyle.title}>Tarifs</h2>

            <div style={mystyle.mob}>
                <h2><u>Application Mobile</u></h2>
                <p><b>Application mobile statique</b>: celle qui n'exige pas une base de données ou serveur, elle est simple et en lecture seule (mode informative)<br /> <span style={{color:'darkred', fontWeight:'bold', background:'white'}}>500$</span>(iOS & Android)<br />Maintenance: +50$/mois dépendant de la compléxité de l'application</p>
                <br />
                <p><b>Application mobile dynamique</b>: elle est complèxe et complète, elle possède une base de donnée et un serveur et peut effectuer toute forme de transaction et tâche requise (réseau social, banking, e-commerce, lecteur mp3-mp4...)<br /> <span style={{color:'darkred', fontWeight:'bold', background:'white'}}>à partir de 999$</span>(iOS & Android)<br />Maintenance: +99$/mois dépendant de la compléxité de l'application</p>
                <br /><p>Le déploiement des applications mobiles exigent 170$ supplémentaires (frais de publication de l'application sur App Store et Play Store) payable chauqe année</p>
            </div>

            <div style={mystyle.mob}>
                <h2><u>Site web</u></h2>
                <p><b>Site web statique</b>: celle qui n'exige pas une base de données ou serveur, elle est simple et en lecture seule (mode informative)<br /> <span style={{color:'darkred', fontWeight:'bold', background:'white'}}>à partir de 150$</span><br />Maintenance: 50$/mois dépendant de la compléxité de l'application</p>
                <p><b>Site web dynamique</b>: elle est complèxe et complète, elle possède une base de donnée et un serveur et peut effectuer toute forme de transaction et tâche requise (réseau social, banking, e-commerce, etc...) <br /> <span style={{color:'darkred', fontWeight:'bold', background:'white'}}>à partir de 299$</span><br />Maintenance: 99$/mois dépendant de la compléxité de l'application</p>
                <br /><p><b>Hébergement & domaine gratuits pour les sites web la première année</b></p>

                <br />
                <p>*A noter que les frais de création et ceux de la maintenance sont deux choses différentes. Néanmoins, la maintenance est facultative, vous pouvez choisir la création seulement sans pouvoir payer des frais chaque mois(risqué car la maintenace sert à éviter des futurs bugs ou piratages)</p><br />
            </div>
            <br /><br />
            
            
            
        </div>
    )
}
export default Tarif
const mystyle={
    div:window.innerWidth<=460?{
        marginTop:'22.5%',
        marginBottom:'10%',
        marginLeft:'1%'
        , zIndex:'-2',
        fontFamily:'serif'
    }:{
        marginTop:'15.5%',
        marginBottom:'10%',
        marginLeft:'1%'
        , zIndex:'-2',
        fontFamily:'serif',
        fontSize:'140%'
    },
    title:{
        color:'Darkorange',
        
        letterSpacing:'1px',
        textAlign:'center'
        
    },
    mob:{
        width:'90%',
        marginLeft:'5%',
        borderRadius:'10px 10px',
        bowShadow:'0 2px 4px darkorange',
        color:'#555',
       // background:'-webkit-linear-gradient(bottom left, black, darkorange)',
        textAlign:'center'
    }
}
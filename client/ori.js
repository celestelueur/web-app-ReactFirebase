//orientation


const Ori=()=>{


    return(
        <div style={window.innerWidth<=460?{marginTop:'22.5%', marginLeft:'2%', color:'#666', lineHeight:'160%', marginBottom:'10%'}:{marginTop:'15.5%', marginLeft:'2%', color:'#666', marginBottom:'10%', fontSize:"140%"}}>
            <h2 style={{color:'DARKORANGE'}}>Orientation</h2>
            <p style={mystyle.txt}>Digitalisez votre business en vous faisant une application mobile ou site web</p><br />
            <p>Le monde d'aujourd'hui est digital, tout le monde et toute entreprise migrent vers le web pour plusieurs raisons dont la principale est que sur le web, vous avez plus d'opportunité d'être vu du monde entier en même temps.</p>
            <p>Vous faites des affaires, vous vendez des marchandises? Un e-commerce (boutique en ligne) doit être votre principale cible</p>
            <p>Les avantages d'un e-commerce:</p>
            <ul >
                <li style={{color:'#666', listStyleType:'revert-layer'}}>Vous vendez directement en ligne et tout le monde peut vous retrouver facilement (mieux qu'avec une boutique sur place)</li><br />
                <li style={{color:'#666'}}>Vous permettrez à vos clients de commander en ligne à partir de votre site web (sans forcément passer par les réseaux sociaux, comme Amazon)</li><br />
                <li style={{color:'#666'}}>Vous aurez également toute l'historique de vos transactions sur votre site vous permettant de bien gérer et analyser vos marchandises</li><br />
            </ul>

            <p>Et si vous êtes une entreprise qui propose des services ou un hôtel ou restaurant, vous pouvez également permettre à vos clients de commander en ligne, de réserver et effectuer toutes les tâches liées à votre entreprise.</p>
            <p>Si vous êtes ou voulez devenir blogueur, Altokudos vous permet également de posséder votre propre adresse web où vous gérer tous vos blogs et passez toute information désirée de manière aisée.</p>
            <p>Toutes sortes d'apllications mobiles également nous mettons à votre disposition. Vous avez besoin de nous conatcter? Allez à la page nous contacter situé en bas de la page d'accueil ou au menu</p>
       <br /><br />
        </div>
    )


}

export default Ori
const mystyle={
    txt:{
        color:'#555',
        letterSpacing:'1px',
        width:'94%', 
        marginLeft:'3%',
        fontWeight:'bold',
        wordWrap:'break-word',
        
    }
}

import React,{ useState} from 'react';
import './Home.css'
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Title from './title';





const Home = () =>{
    const [member ,setMember] = useState("");
    const [prize  ,setPrize] = useState("");
    const [result ,setResult] = useState("");

   
    const memberList_trim_new = (mem) =>{
        let memberList_trim = mem.split('\n');
        let memberList_trim_new = []
        for(let i=0;i<memberList_trim.length;i++){
            if(memberList_trim[i].trim() !== ""){
                memberList_trim_new.push(memberList_trim[i].trim()) 
            }
        }
        console.log(memberList_trim_new)
        return memberList_trim_new
    }

    function new_member (m) {
        var new_member = ""
        for(let i=0;i<m.length;i++){
            new_member = new_member + m[i] + '\n'
        }
        console.log(new_member)
        setMember(new_member)
    }

    const num_prize = (p_t) =>{
        let prizeList = p_t.split('\n')
        let new_prizeList = [],prizeNum = []
        for(let i=0;i<prizeList.length;i++){
            if(prizeList[i].trim() !== ""){
                let p = prizeList[i].trim().split(',')
                if(p.length === 1){
                    let p1 = parseInt(p)
                    if(isNaN(p1)){
                        new_prizeList.push(p[0])
                        prizeNum.push(1)
                    }
                    else{
                        new_prizeList.push("")
                        prizeNum.push(p1)
                    }
                }
                else if(p.length === 2){
                    let p1 = parseInt(p[1])
                    if(isNaN(p1)){    
                        new_prizeList.push(prizeList[i].trim())
                        prizeNum.push(1)
                    }
                    else{
                        new_prizeList.push(p[0])
                        prizeNum.push(p[1])
                    }
                }
                else{
                    new_prizeList.push(prizeList[i].trim())
                    prizeNum.push(1)
                }
            }
        }
        return prizeNum[prizeNum.length-1]
    }

    function new_prize(m){
        let prize1 = m.split('\n')
        let new_prize1 = ""
        for(let i=0;i<prize1.length -1;i++){
            new_prize1 = new_prize1 + prize1[i] + '\n'
        }
        setPrize(new_prize1)
    }

    function startLottery(){
        setMember( member.trim())
        if(member.trim() !== ""){
            setPrize(prize.trim())
            if(prize.trim() !== ""){
                var select_member = num_prize(prize.trim())
                console.log(select_member)
                let new_memberList_trim = memberList_trim_new(member.trim())
                var ran = []
                var ran1 = 0
                if(select_member > new_memberList_trim.length){
                    for(let i=0;i<new_memberList_trim.length;i++){
                        ran1 = i
                        ran.push(ran1)
                    }
                }
                else{
                    for(let i=0;i<select_member;i++){
                        ran1 = Math.floor(Math.random()*new_memberList_trim.length);
                        while(ran.indexOf(ran1) !== -1){
                            ran1 = Math.floor(Math.random()*new_memberList_trim.length);
                        }
                        ran.push(ran1)
                    }
                }
                var new_m_t = ""
                var delete_member = []
                for(let i=0;i<ran.length;i++){
                    new_m_t = new_m_t +  new_memberList_trim[ran[i]] + '\n';
                    delete_member.push(new_memberList_trim[ran[i]])
                }
                setResult(new_m_t);
                new_memberList_trim = new_memberList_trim.filter(mem => !delete_member.includes(mem))
                console.log(new_memberList_trim)
                
                new_member(new_memberList_trim)
                new_prize(prize.trim())
            }
            else{
                alert("沒有獎項")
            }
        }
        else{
            alert("沒有抽獎人員")
        }
    }
    
    return (
        <div className='outside'>
            <Title />
            <div className='container-outside'>
                <div  className='container-content'>
                    <h1>抽獎人員:</h1>
                    <textarea placeholder="請輸入抽獎人員，一列代表一名人員
                    ex:
                    王xx
                    鄭xx
                    ...
                    "  
                    value={member} 
                    onChange={(e) => {setMember(e.target.value)}}/>
                </div>
                <div className='container-content'>
                    <h1> 抽獎物品:</h1>
                    <textarea placeholder="請輸入抽獎品，一列代表一個獎品
                    格式:
                    頭獎xx <- 預設抽一個
                    二獎oo,2 <- 抽oo兩個 
                    20 <- 抽20個
                    "
                    value={prize}
                    onChange={(e) => {setPrize(e.target.value)}} />
                </div>
                <div className='container-content'>
                    <h1> 中獎名單:</h1>
                    <textarea value={result}
                    onChange={(e) =>{setResult(e.target.value)}}
                    />
                </div>
            </div>
            <button className='start btn btn-primary' onClick={startLottery}>開始抽獎</button>
        </div>
    );
}

export default Home;
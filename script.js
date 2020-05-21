const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let particleA=[];


let mouse={
    x:null,
    y:null,
    radius:50
}

window.addEventListener('mousemove',
function(event){
    mouse.x=event.x + canvas.clientLeft/2;
    mouse.y=event.y + canvas.clientTop/2;
}
);

function drawImage(){
    let imageWidth=png.width;
    let imageHeight=png.height;
    const data=ctx.getImageData(0,0,imageWidth,imageHeight);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    class particle{

        constructor(x,y,color,size){
            this.x=x + canvas.width/2 - png.width*2,
            this.y=y + canvas.height/2 - png.height*2,
            this.color=color,
            this.size=2,
            this.baseX=x + canvas.width/2 - png.width*2,
            this.baseY=y + canvas.height/2 - png.height*2,
            this.density=(Math.random() * 10)*2;
        }

        draw(){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.size,0,Math.PI * 2);
            ctx.closePath();
            ctx.fill();
    
        }
        update(){
            ctx.fillStyle=this.color;

            let dx=mouse.x-this.x;
            let dy=mouse.y-this.y;
            let distance=Math.sqrt(dx*dx +dy*dy);
            let forceDirectionX=dx/distance;
            let forceDirectionY=dy/distance;

            const maxDistance=100;
            let force=(maxDistance-distance)/maxDistance;
            if(force < 0) force=0;

            let directionX=(forceDirectionX+force+this.density*0.6);
            let directionY=(forceDirectionY+force+this.density*0.6);

            if(distance < mouse.radius+this.size)
            {
                this.x-=directionX;
                this.y-=directionY;
            }    
            else
            {
                if(this.x!=this.baseX)
                {
                    let dx=this.x-this.baseX;
                    this.x-=dx/20;    
                }if(this.y!=this.baseY){
                    let dy=this.y-this.baseY;
                    this.y-=dy/20;    
                }
            }
            this.draw()
        }
    }
    function init(){
        particleA=[];

        for(let y=0,y2=data.height;y<y2;y++)
        {
            for(let x=0,x2=data.width;x<x2;x++){
                if(data.data[(y * 4 *data.width) + (x*4) + 3] >128)
                {
                    let positionX=x;
                    let positionY=y;
                    let color="rgba(" + data.data[(y*4*data.width)+(x*4)] + ","+
                        data.data[(y*4*data.width) + (x*4)+1]+","+
                        data.data[(y*4*data.width) + (x*4)+2]+")";
                    particleA.push(new particle(positionX*4,positionY*4,color));    
                }
            }
        }
    }
    function animate(){
        requestAnimationFrame(animate);
        ctx.fillStyle='rgba(0,0,0,0.5)';
        ctx.fillRect(0,0,innerWidth,innerHeight);

        for(let i=0;i<particleA.length;i++)
        {
            particleA[i].update();
        }

    }
    
    init();
    animate();

    window.addEventListener('resize',
    function(){
        canvas.width=this.innerWidth;
        canvas.height=this.innerHeight;
        init();

    }
    );
}

const png=new Image();
png.src="data:image/png;base64,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";

window.addEventListener('load',(event)=>{
    console.log('Page has loaded');
    ctx.drawImage(png,0,0);
    drawImage();
});

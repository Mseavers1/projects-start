class Play {
    constructor(playData) {

        this.acts = [];
        this.players = [];

        this.title = playData.title;
        this.short = playData.short;

        playData.persona.forEach( p => {  this.players.push(p)});

        playData.acts.forEach( a => {
            this.acts.push( new Act(a) );
        });
    }

    output(playContainer, actContainer, sceneContainer) {
        playContainer.textContent = this.title;
        this.acts[0].output(actContainer, sceneContainer);
    }

}

class Act {

    constructor(actData) {
        this.name = actData.name;
        this.scenes = [];
        actData.scenes.forEach( s => {
            this.scenes.push( new Scene(s.name, s.title, s.stageDirection, s.speeches) );
        })

    }

    output(actContainer, sceneContainer) {
        actContainer.textContent = this.name;
        this.scenes[0].output(sceneContainer);
    }

}


class Scene {

    constructor(name,title,direction,speeches) {
        this.name = name;
        this.title = title;
        this.direction = direction;
        this.speeches = speeches;
    }


    output(container, search, player) {
        container.innerHTML = "";
        const h4 = document.createElement('h4');
        h4.textContent = this.name;
        container.appendChild(h4);
        const pTitle = document.createElement('p');
        pTitle.classList.add('title');
        pTitle.textContent = this.title;
        container.appendChild(pTitle);
        const pDirection = document.createElement('p');
        pDirection.classList.add('direction');
        pDirection.textContent = this.direction;
        container.appendChild(pDirection);

        this.outputSpeeches(container, search, player);

    }

    outputSpeeches(container, search, player) {
        const divs = this.speeches.map( sp => {


            const div = document.createElement('div');
            div.classList.add('speech');
            if (player && sp.speaker != player && player != 0) return div;
            const span = document.createElement('span');
            span.textContent = sp.speaker;
            div.appendChild(span);
            const lines = sp.lines.map( line => {
                const p = document.createElement('p');
                if (search) {
                    const newLine = line.replace(new RegExp(search, "i"),`<b>${search}</b>`);
                    p.innerHTML = newLine;
                } else {
                    p.textContent = line;
                }
                return p;
            } );
            lines.forEach( line => { div.appendChild(line) } );
            if (sp.stagedir) {
                const em = document.createElement('em');
                em.textContent = sp.stagedir;
                div.appendChild(em);
            }
            return div;
        });

        divs.forEach( div => { container.appendChild(div) } );
    }
}



export { Play };
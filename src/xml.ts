

module WA.XML {
    
    export class Node {
        
        constructor(public name: string, public attrs: Object = {}, public childs: Node[] = []) {
            
        }
    }
}

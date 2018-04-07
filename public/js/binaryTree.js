(function() {
    let tree;

    function Tree(n) {
        this.root = null;
    }

    Tree.prototype.add = function(val){
        let n = new Node(val)
        if(this.root === null){
            this.root = n
        } else {
            this.root.addNode(n)
        }
    }



    Node.prototype.addNode = function(n){
        if(n.value < this.value){
            if (this.left === null) {
                this.left = n;
            } else {
                this.left.addNode(n);
            }

        } else if (n.value > this.value){
            if (this.right === null) {
                this.right = n;
            } else {
                this.right.addNode(n);
            }
        }
    }

    function Node(val) {
        this.value = val;
        this.left = null;
        this.right = null;
    }

    function makeTree(){
        tree = new Tree()
        let crazyArr = [50,3,65,32,89,76,43,2,1,78,99,102,47,22,27]
        for (var i = 0; i < 10; i++) {
            tree.add(Math.floor(Math.random() * (100 - 1) + 1))
        }

        console.log(tree);
    }
    makeTree()

})();

function stvoriOsobu(name, age) {
    return {
        name,
        age
    };
} 

let osoba = stvoriOsobu('mate', 10);
console.log(osoba['name']);

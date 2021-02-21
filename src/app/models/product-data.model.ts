export interface MainProduct {
    size: number;
    group: string;
    classification: string;
    pattern: string;
    variety: string;
    model: string;
}


// example
// product = {
//     size: [8,10,20,30];
//     group: ['All', 'Popup Displays', 'Tension Fabric Displays', 'SEG Displays'];
//     classification: ['All', 'Backlit', 'Not-Backlit'];
//     pattern: ['Curved', 'Staright'];
//     variety: ['All', 'Single-Sided', 'Double-Sided'];
//     model: ['End-Caps', 'Front Graphic Only'];
// }
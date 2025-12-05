// export class SortById<T extends { id: string }> {
//     compare(a: T, b: T): number {
//         return a.id.localeCompare(b.id);
//     }
// }




export function SortById<T extends { id: string }>
    (a: T, b: T): number {
    return a.id.localeCompare(b.id);

}
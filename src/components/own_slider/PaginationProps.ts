export interface PaginationProps {
    total: number; //nombre total de slides
    activeIndex: number; // index de la slide active
    onSelect:(index: number)=>void;//fonction pour changer de slide
}
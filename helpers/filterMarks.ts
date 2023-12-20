import {MarkType} from "~/app/types/marks";

export const popularMarks = (marks: MarkType[], spliceNumber: number) => {
    let sortedMarks = marks.filter(mark => mark.priority)?.sort((a: any, b: any) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())).splice(0, spliceNumber)

    //ХАРДКОД для замены ДВ ХОВЕР на ОМОДУ в списке популярных марок
    let omoda = marks.find(mark => mark.slug === 'omoda')
    return sortedMarks.map(mark => {
        return mark.slug === 'dw-hower' ? omoda : mark
    })
    //

}

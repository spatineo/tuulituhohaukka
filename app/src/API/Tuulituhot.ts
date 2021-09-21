
export interface TuulituhoResult {
    data: [{
        time: number
        count: number
    }]
}

const SMK_FEATURE_SERVICE = 'https://aineistot.metsakeskus.fi/metsakeskus/rest/services/Metsatieto/MKItuhot/FeatureServer/0/query/'

export function getTuulituhotDaily(time_start : Date, time_end : Date) : Promise<TuulituhoResult> {
    return new Promise((resolve, reject) => {
        const url = new URL(SMK_FEATURE_SERVICE)
        const params : Record<string, string> = {
            f: 'json',
            groupByFieldsForStatistics: 'mki_saapumispvm',
            outStatistics: '[{"statisticType":"COUNT","onStatisticField":"mki_saapumispvm","outStatisticFieldName":"stats"}]',
            time: `${time_start.getTime()},${time_end.getTime()}`
        }
        Object.keys(params).forEach(k => { url.searchParams.append(k, params[k]) })
        console.log('fetching', url.toString())
        fetch(url.toString(), { method: 'GET' }).then(response => {
            response.json().then(data => {
                resolve(data.features.map((f : any) => ({ time : f.attributes.mki_saapumispvm, count : f.attributes.stats })))
            }).catch(reject)
        }).catch(reject)
    })
}
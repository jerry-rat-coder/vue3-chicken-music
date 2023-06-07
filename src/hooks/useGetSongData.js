import { getSongDetail, getSongUrl } from "@/services/api/song";
export default function useGetSongData() {
    async function getSongData(id) {
        if (id) {
            //获取歌曲基本信息
            const res = await getSongDetail(id).then(async(res) => {
                // console.log('detail',res)
                if (res.songs) {
                    // console.log(res);
                    // console.log(res.data.songs[0]);
                    let songData = {
                        id: id,
                        name: res.songs[0].name,
                        al: res.songs[0].al,
                        singer: res.songs[0].ar,
                        time: formatDuring(res.songs[0].dt),
                        dt: res.songs[0].dt,
                        songUrl: '',
                    };
                    //请求 歌曲 url
                    const ret = await getSongUrl(id);
                    // console.log('ret',ret)
                    songData.songUrl = ret.data.data[0].url;
                    return songData;
                    // console.log(this.currentSongBaseInfo);
                } else {
                    console.log(res.statusText);
                }
            });
            return res;
        }
    }

    function formatDuring(mss) {
        let days = parseInt(mss / (1000 * 60 * 60 * 24));
        let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = parseInt((mss % (1000 * 60)) / 1000);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return minutes + ":" + seconds;
    }
    return {
        getSongData
    }
}
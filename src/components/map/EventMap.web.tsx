import 'maplibre-gl/dist/maplibre-gl.css';
import * as maplibregl from 'maplibre-gl';
import type { Map as MLMap } from 'maplibre-gl';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import type { EventMapPin, MapViewport } from '../../types/map';

interface Props {pins:EventMapPin[];selectedEventId:string|null;onSelectPin:(id:string)=>void;onViewportChange:(v:MapViewport)=>void}
const STYLE='https://tiles.openfreemap.org/styles/positron';
export function EventMap({pins,selectedEventId,onSelectPin,onViewportChange}:Props){
 const host=useRef<HTMLDivElement|null>(null);const map=useRef<MLMap|null>(null);const markers=useRef<maplibregl.Marker[]>([]);
 useEffect(()=>{if(!host.current||map.current)return;const m=new maplibregl.Map({container:host.current,style:STYLE,center:[-80.1937,25.7743],zoom:10.5,attributionControl:false});map.current=m;m.addControl(new maplibregl.NavigationControl({showCompass:false}),'bottom-right');let timer:ReturnType<typeof setTimeout>|undefined;const publish=()=>{if(timer)clearTimeout(timer);timer=setTimeout(()=>{const b=m.getBounds(),c=m.getCenter();onViewportChange({latitude:c.lat,longitude:c.lng,zoom:m.getZoom(),bounds:{north:b.getNorth(),south:b.getSouth(),east:b.getEast(),west:b.getWest()}})},280)};m.on('load',publish);m.on('moveend',publish);return()=>{if(timer)clearTimeout(timer);m.remove();map.current=null}},[onViewportChange]);
 useEffect(()=>{const m=map.current;if(!m)return;markers.current.forEach(x=>x.remove());markers.current=pins.map(pin=>{const el=document.createElement('button');el.type='button';el.setAttribute('aria-label',pin.title);el.textContent=pin.priceLabel;Object.assign(el.style,{border:'0',borderRadius:'999px',padding:'9px 13px',font:'600 12px Plus Jakarta Sans, sans-serif',color:'#fff',background:pin.eventId===selectedEventId?'#f47d30':'#3d98d3',boxShadow:'0 5px 14px rgba(22,23,23,.22)',cursor:'pointer',whiteSpace:'nowrap'});el.onclick=()=>onSelectPin(pin.eventId);return new maplibregl.Marker({element:el,anchor:'bottom'}).setLngLat([pin.coordinate.longitude,pin.coordinate.latitude]).addTo(m)});return()=>markers.current.forEach(x=>x.remove())},[pins,selectedEventId,onSelectPin]);
 return <View style={{flex:1}}><div ref={host} style={{position:'absolute',inset:0}}/></View>
}

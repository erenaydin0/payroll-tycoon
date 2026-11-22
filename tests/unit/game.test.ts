import { describe,it,expect } from 'vitest';
import {initial,transition,valid} from '../../src/simulation/game';
import {decode} from '../../src/persistence/save';
describe('payroll loop',()=>{
 it('starts with specified values',()=>expect(initial()).toEqual({version:1,money:5000,month:1,client:false,step:0}));
 it('requires contract and prevents duplicate payments',()=>{let s=initial();expect(()=>transition(s,'step')).toThrow();s=transition(s,'accept');expect(()=>transition(s,'accept')).toThrow();expect(()=>transition(s,'next')).toThrow();for(let i=0;i<3;i++)s=transition(s,'step');expect(s.money).toBe(5600);expect(()=>transition(s,'step')).toThrow();s=transition(s,'next');expect(s.month).toBe(2);expect(s.step).toBe(0);expect(valid(s)).toBe(true);for(let i=0;i<3;i++)s=transition(s,'step');expect(s.money).toBe(6200);expect(decode(JSON.stringify(s))).toEqual(s);});
 it('recovers corrupt or unsupported saves',()=>{for(const raw of ['{','null','{}',JSON.stringify({...initial(),version:2}),JSON.stringify({...initial(),money:-1}),JSON.stringify({...initial(),month:2})])expect(decode(raw)).toEqual(initial());});
});

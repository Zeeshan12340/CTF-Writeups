mapping = {'e380b3':'0','e384b3':'1','e388b3':'2','e38cb3':'3','e390b3':'4','e394b3':'5','e398b3':'6','e39cb3':'7','e3a0b3':'8','e3a4b3':'9','e384b6':'a','e388b6':'b','e38cb6':'c','e390b6':'d','e394b6':'e','e398b6':'f','e39cb6':'g','e3a0b6':'h','e3a4b6':'i','e684b6':'j','e688b6':'k','e68cb6':'l','e690b6':'m','e694b6':'n','e698b6':'o','e380b7':'p','e384b7':'q','e388b7':'r','e38cb7':'s','e390b7':'t','e394b7':'u','e398b7':'v','e39cb7':'w','e3a0b7':'x','e3a4b7':'y','e684b7':'z','e384b4':'A','e388b4':'B','e38cb4':'C','e390b4':'D','e394b4':'E','e398b4':'F','e39cb4':'G','e3a0b4':'H','e3a4b4':'I','e684b4':'J','e688b4':'K','e68cb4':'L','e690b4':'M','e694b4':'N','e698b4':'O','e380b5':'P','e384b5':'Q','e388b5':'R','e38cb5':'S','e390b5':'T','e394b5':'U','e398b5':'V','e39cb5':'W','e3a0b5':'X','e3a4b5':'Y','e684b5':'Z','e384b2':'!','e388b2':'"','e38cb2':'#','e390b2':'$','e394b2':'%','e398b2':'&','e39cb2':'\'','e3a0b2':'(','e3a4b2':')','e684b2':'*','e688b2':'+','e68cb2':',','e690b2':'-','e694b2':'.','e698b2':'/','e684b3':':','e688b3':';','e68cb3':'<','e690b3':'=','e694b3':'>','e698b3':'?','e380b4':'@','e688b5':'[','e68cb5':'\\','e690b5':']','e694b5':'^','e698b5':'_','e380b6':'`','e688b7':'{','e68cb7':'|','e690b7':'}','e694b7':'~','e380b2':' ','e3a4b0':'\t','e684b0':'\n','e690b0':'\r','e688b0':'\x0b','e68cb0':'\x0c',}

text = ''
cipher = 'e38cb5e394b6e38cb6e398b5e384b6e68cb6e688b7e68cb6e698b6e68cb6e698b5e390b7e3a0b6e384b4e390b7e698b5e39cb7e384b6e38cb7e698b5e694b6e698b6e698b5e394b6e694b6e38cb6e388b7e3a4b7e380b7e390b7e384b3e698b6e694b6e690b7'
i = 0
while i < len(cipher):
     text += (mapping[(cipher[i:i+6])])
     i += 6
print(text)

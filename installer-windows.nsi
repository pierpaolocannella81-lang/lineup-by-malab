Unicode true
Name "LineUp by MALab 1.0.3"
OutFile "dist\LineUp by MALab Setup 1.0.3.exe"
InstallDir "$LOCALAPPDATA\Programs\LineUp by MALab"
RequestExecutionLevel user

Page directory
Page instfiles
UninstPage uninstConfirm
UninstPage instfiles

Section "Installa LineUp by MALab"
  SetOutPath "$INSTDIR"
  File /r "dist\win-unpacked\*.*"
  CreateDirectory "$SMPROGRAMS\LineUp by MALab"
  CreateShortcut "$DESKTOP\LineUp by MALab.lnk" "$INSTDIR\LineUp by MALab.exe"
  CreateShortcut "$SMPROGRAMS\LineUp by MALab\LineUp by MALab.lnk" "$INSTDIR\LineUp by MALab.exe"
  CreateShortcut "$SMPROGRAMS\LineUp by MALab\Disinstalla LineUp by MALab.lnk" "$INSTDIR\Uninstall LineUp by MALab.exe"
  WriteUninstaller "$INSTDIR\Uninstall LineUp by MALab.exe"
SectionEnd

Section "Uninstall"
  Delete "$DESKTOP\LineUp by MALab.lnk"
  Delete "$SMPROGRAMS\LineUp by MALab\LineUp by MALab.lnk"
  Delete "$SMPROGRAMS\LineUp by MALab\Disinstalla LineUp by MALab.lnk"
  RMDir "$SMPROGRAMS\LineUp by MALab"
  RMDir /r "$INSTDIR"
SectionEnd

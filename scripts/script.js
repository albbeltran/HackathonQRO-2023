function showDiv(divId, element) {
    document.getElementById(divId).style.display = element.value == 0 ? 'none' : 'block';
}